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
import { getAllOrders, getUserType, SET_ALL_ORDERS, SET_ALL_USERS } from "../../redux";
import { userTypes } from "../../constants";
import CustomerNew from "../Common/CustomerNew";
import PrinterNew from "../Common/PrinterNew";
import { getAllOrdersByStore, getAllUsers, updateUserType } from "../../Service/queries";
import { getAllUsers as getAllUsersRdx } from "../../redux";
import Customer from "../Common/Customer";
import Printer from "../Common/Printer";
import { CustomerBdg, Issues, NewOrder, PrinterBdg, Resolved, Shipped } from "../Common/Badges";

function AdminHome(props) {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Ciao Bryan 👋 here's a status update</h3>
      <Container style={{ marginTop: 35 }}>
        <Row>
          <Col style={{ textAlign: "center", marginTop: 10 }} xs={6} sm={3}>
            <h2>
              {props?.allOrders?.filter &&
                props.allOrders.filter((ord) => !["issue", "shipped", "resolved"].includes(ord.statues)).length}{" "}
              📥
            </h2>
            <h6>New Orders Today</h6>
          </Col>
          <Col style={{ textAlign: "center", marginTop: 10 }} xs={6} sm={3}>
            <h2>{props?.allOrders?.filter && props.allOrders.filter((ord) => ord.statues === "issue").length} ⛔️</h2>
            <h6>Blocked Order</h6>
          </Col>
          <Col style={{ textAlign: "center", marginTop: 10 }} xs={6} sm={3}>
            <h2>{props?.allOrders?.filter && props.allOrders.filter((ord) => ord.statues === "shipped").length} 🚛</h2>
            <h6>Orders in Transit</h6>
          </Col>
          <Col style={{ textAlign: "center", marginTop: 10 }} xs={6} sm={3}>
            <h2>{props?.allOrders?.filter && props.allOrders.filter((ord) => ord.statues === "resolved").length} 🎉</h2>
            <h6>Orders Resolved</h6>
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
                      await updateUserType(admin.UserID, "printer");
                      props.getAllUser();
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <i style={{ color: "#a0a0a0" }}>To invite an admin, invite a regular customer and give them admin status</i>
      <h3 style={{ marginTop: 35 }}>Unassigned orders</h3>
      <Table hover style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Customer</th>
            <th>Printer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props?.allOrders?.map &&
            props.allOrders
              .filter((ord) => ord.assigned === "employee name")
              .map((order) => (
                <tr onClick={() => navigate(`/admin/orders/${order.orderId}`)}>
                  <td>{order.orderTitle}</td>
                  <td>{order.userId}</td>
                  <td>{order.assigned === "employee name" ? "unassigned" : order.assigned}</td>
                  <td>
                    {(() => {
                      switch (order.statues) {
                        case "resolved":
                          return <Resolved />;
                        case "issue":
                          return <Issues />;
                        case "shipped":
                          return <Shipped />;
                        default:
                          return <NewOrder />;
                      }
                    })()}
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
}

export default function Admin(props) {
  const navigate = useNavigate();
  const userType = useSelector(getUserType);
  const allUsers = useSelector(getAllUsersRdx);
  const allOrders = useSelector(getAllOrders);
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
              element={
                <CustomerList
                  customers={allUsers?.filter && allUsers.filter((user) => user.AccessLevel === userTypes.CUSTOMER)}
                />
              }
            />
            <Route path=":customerId" element={<Customer />} />
            <Route path="new" element={<CustomerNew />} />
          </Route>
          <Route path="printers">
            <Route
              index
              element={
                <PrinterList
                  printers={allUsers?.filter && allUsers.filter((user) => user.AccessLevel === userTypes.PRINTER)}
                />
              }
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
                allOrders={allOrders}
              />
            }
          />
        </Routes>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            color: "#696969",
            marginTop: 50,
            marginBottom: 30
          }}>
          <p>© PhotoPrinter 2021</p>
        </div>
      </Container>
    </div>
  );
}
