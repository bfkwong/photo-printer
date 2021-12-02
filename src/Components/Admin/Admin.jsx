import React, { useCallback } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import NavigationBar from "../Common/NavigationBar";
import OrderList from "../Common/OrderList";
import Order from "../Common/Order";
import OrderNew from "../Common/OrderNew";
import CustomerList from "../Common/CustomerList";
import PrinterList from "../Common/PrinterList";
import { getUserType, SET_ALL_ORDERS, SET_ALL_USERS } from "../../redux";
import { userTypes } from "../../constants";
import CustomerNew from "../Common/CustomerNew";
import PrinterNew from "../Common/PrinterNew";
import { getAllOrdersByStore, getAllUsers, updateUserType } from "../../Service/queries";
import { getAllUsers as getAllUsersRdx } from "../../redux";
import Customer from "../Common/Customer";
import Printer from "../Common/Printer";
import { Plus } from "react-bootstrap-icons";
import { CustomerBdg, PrinterBdg } from "../Common/Badges";

function AdminHome(props) {
  return (
    <div>
      <h3>Ciao Bryan 👋 here's a status update</h3>
      <Container style={{ marginTop: 35 }}>
        <Row>
          <Col style={{ textAlign: "center", marginTop: 10 }} xs={6} sm={3}>
            <h2>36 📥</h2>
            <h6>New Orders Today</h6>
          </Col>
          <Col style={{ textAlign: "center", marginTop: 10 }} xs={6} sm={3}>
            <h2>7 ⛔️</h2>
            <h6>Blocked Order</h6>
          </Col>
          <Col style={{ textAlign: "center", marginTop: 10 }} xs={6} sm={3}>
            <h2>182 🚛</h2>
            <h6>Orders in Transit</h6>
          </Col>
          <Col style={{ textAlign: "center", marginTop: 10 }} xs={6} sm={3}>
            <h2>$43.2k 💰</h2>
            <h6>Total Revenue</h6>
          </Col>
        </Row>
      </Container>
      <h3 style={{ marginTop: 35 }}>Your admin team</h3>
      <Table hover style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Downgrade to</th>
          </tr>
        </thead>
        <tbody>
          {props?.admins?.map &&
            props.admins.map((admin) => (
              <tr>
                <td>{`${admin.FirstName} ${admin.LastName}`}</td>
                <td>{admin.Email}</td>
                <td>
                  <CustomerBdg
                    onClick={async () => {
                      await updateUserType(admin.UserID, "customer");
                      props.getAllUser();
                    }}
                  />
                  <PrinterBdg
                    onClick={async () => {
                      await updateUserType(admin.UserID, "customer");
                      props.getAllUser();
                    }}
                  />
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }} onClick={() => props.navigate(`/admin/admins/new`)}>
              <b>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Plus size={30} />
                  <div>Invite a new admin</div>
                </div>
              </b>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default function Admin(props) {
  const navigate = useNavigate();
  const userType = useSelector(getUserType);
  const allUsers = useSelector(getAllUsersRdx);
  const dispatch = useDispatch();

  const getAllUser = useCallback(async () => {
    const allUsersResp = await getAllUsers();
    if (allUsersResp !== "ERROR") {
      dispatch({ type: SET_ALL_USERS, payload: allUsersResp !== "ERROR" ? allUsersResp : [] });
    }
  }, [dispatch]);

  React.useEffect(() => {
    getAllUser();
    (async () => {
      const allOrdersResp = await getAllOrdersByStore("0000");
      dispatch({ type: SET_ALL_ORDERS, payload: allOrdersResp !== "ERROR" ? allOrdersResp : [] });
    })();
  }, [dispatch, getAllUser]);

  if (userType === userTypes.CUSTOMER) {
    return <Navigate to="/customer" />;
  }
  if (userType === userTypes.PRINTER) {
    return <Navigate to="/printer" />;
  }

  return (
    <div>
      <NavigationBar
        title="Admin"
        titleAction={() => navigate("/admin")}
        config={[
          { type: "normal", text: "Orders", action: () => navigate("/admin/orders") },
          { type: "normal", text: "Customers", action: () => navigate("/admin/customers") },
          { type: "normal", text: "Printers", action: () => navigate("/admin/printers") }
        ]}
      />
      <Container fluid="sm" style={{ marginTop: 10 }}>
        <Routes>
          <Route path="orders">
            <Route index element={<OrderList />} />
            <Route path=":orderId" element={<Order />} />
            <Route path="new" element={<OrderNew />} />
          </Route>
          <Route path="customers">
            <Route
              index
              element={<CustomerList customers={allUsers.filter((user) => user.AccessLevel === userTypes.CUSTOMER)} />}
            />
            <Route path=":customerId" element={<Customer />} />
            <Route path="new" element={<CustomerNew />} />
          </Route>
          <Route path="printers">
            <Route
              index
              element={<PrinterList printers={allUsers.filter((user) => user.AccessLevel === userTypes.PRINTER)} />}
            />
            <Route path=":printerId" element={<Printer />} />
            <Route path="new" element={<PrinterNew />} />
          </Route>
          <Route
            path="*"
            element={
              <AdminHome
                navigate={navigate}
                admins={allUsers.filter((user) => user.AccessLevel.toLowerCase() === "admin")}
                getAllUser={getAllUser}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
}
