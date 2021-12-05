import React, { useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import NavigationBar from "../Common/NavigationBar";
import OrderList from "../Common/OrderList";
import { getAllOrders, getUserType, SET_ALL_ORDERS } from "../../redux";
import { userTypes } from "../../constants";
import Order from "../Common/Order";
import OrderNew from "../Common/OrderNew";
import Gallery from "../Common/Gallery";
import { useDispatch } from "react-redux";
import { getAllOrders as getAllOrdersQry } from "../../Service/queries";

function CustomerHome(props) {
  return (
    <div>
      <h3>Ciao Bryan 👋 here's a status update</h3>
      <Container style={{ marginTop: 35 }}>
        <Row style={{ marginBottom: 30 }}>
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
        <Gallery />
      </Container>
    </div>
  );
}

export default function Customer(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = useSelector(getUserType);
  const orders = useSelector(getAllOrders);

  useEffect(() => {
    (async () => {
      const allOrdersResp = await getAllOrdersQry();
      dispatch({ type: SET_ALL_ORDERS, payload: allOrdersResp !== "ERROR" ? allOrdersResp : [] });
    })();
  }, [dispatch]);

  if (userType === userTypes.ADMIN) {
    return <Navigate to="/admin" />;
  }
  if (userType === userTypes.PRINTER) {
    return <Navigate to="/printer" />;
  }

  return (
    <div>
      <NavigationBar
        title="Customer"
        titleAction={() => navigate("/customer")}
        config={[
          { type: "normal", text: "Orders", action: () => navigate("/customer/orders") },
          { type: "normal", text: "Gallery", action: () => navigate("/customer/gallery") }
        ]}
      />
      <Container fluid="sm" style={{ marginTop: 10 }}>
        <Routes>
          <Route path="/" element={<CustomerHome allOrders={orders} />} />
          <Route path="orders">
            <Route index element={<OrderList orders={orders} />} />
            <Route path=":orderId" element={<Order />} />
            <Route path="new" element={<OrderNew />} />
          </Route>
          <Route path="gallery">
            <Route index element={<Gallery />} />
          </Route>
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
