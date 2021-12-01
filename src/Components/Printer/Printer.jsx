import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import NavigationBar from "../Common/NavigationBar";
import OrderList from "../Common/OrderList";
import CustomerList from "../Common/CustomerList";
import { getAllOrders, getUserType } from "../../redux";
import { userTypes } from "../../constants";
import Order from "../Common/Order";
import OrderNew from "../Common/OrderNew";
import CustomerNew from "../Common/CustomerNew";

function PrinterHome() {
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

export default function Printer(props) {
  const navigate = useNavigate();
  const userType = useSelector(getUserType);
  const orders = useSelector(getAllOrders);

  if (userType === userTypes.ADMIN) {
    return <Navigate to="/admin" />;
  }
  if (userType === userTypes.CUSTOMER) {
    return <Navigate to="/customer" />;
  }

  return (
    <div>
      <NavigationBar
        title="Printer"
        titleAction={() => navigate("/printer")}
        config={[
          { type: "normal", text: "Orders", action: () => navigate("/printer/orders") },
          { type: "normal", text: "Customers", action: () => navigate("/printer/customers") }
        ]}
      />
      <Container fluid="sm" style={{ marginTop: 10 }}>
        <Routes>
          <Route path="orders">
            <Route index element={<OrderList orders={orders} />} />
            <Route path=":orderId" element={<Order />} />
            <Route path="new" element={<OrderNew />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path=":customerId" element={<h1>Customer</h1>} />
            <Route path="new" element={<CustomerNew />} />
          </Route>
          <Route path="*" element={<PrinterHome />}></Route>
        </Routes>
      </Container>
    </div>
  );
}
