import React from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import NavigationBar from "../Common/NavigationBar";
import OrderList from "../Common/OrderList";
import { getAllOrders, getUserType } from "../../redux";
import { userTypes } from "../../constants";
import Order from "../Common/Order";
import OrderNew from "../Common/OrderNew";
import Gallery from "../Common/Gallery";

function CustomerHome() {
  return (
    <div>
      <h3>Ciao Bryan 👋 here's a status update</h3>
      <Container style={{ marginTop: 35 }}>
        <Row>
          <Col style={{ textAlign: "center", marginTop: 10 }} xs={6} sm={3}>
            <h2>8 📥</h2>
            <h6>New Orders Today</h6>
          </Col>
          <Col style={{ textAlign: "center", marginTop: 10 }} xs={6} sm={3}>
            <h2>2 ⛔️</h2>
            <h6>Blocked Order</h6>
          </Col>
          <Col style={{ textAlign: "center", marginTop: 10 }} xs={6} sm={3}>
            <h2>26 🚛</h2>
            <h6>Orders in Transit</h6>
          </Col>
          <Col style={{ textAlign: "center", marginTop: 10 }} xs={6} sm={3}>
            <h2>328 🎉</h2>
            <h6>Completed Orders</h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default function Customer(props) {
  const navigate = useNavigate();
  const userType = useSelector(getUserType);
  const orders = useSelector(getAllOrders);

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
          <Route path="/" element={<CustomerHome />} />
          <Route path="orders">
            <Route index element={<OrderList orders={orders} />} />
            <Route path=":orderId" element={<Order />} />
            <Route path="new" element={<OrderNew />} />
          </Route>
          <Route path="gallery">
            <Route index element={<Gallery />} />
          </Route>
        </Routes>
      </Container>
    </div>
  );
}
