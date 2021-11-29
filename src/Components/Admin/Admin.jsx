import React from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import NavigationBar from "../Common/NavigationBar";
import OrderList from "../Common/OrderList";
import CustomerList from "../Common/CustomerList";
import PrinterList from "../Common/PrinterList";
import { getUserType } from "../../redux";
import { userTypes } from "../../constants";

function AdminHome() {
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
    </div>
  );
}

export default function Admin(props) {
  const navigate = useNavigate();
  const userType = useSelector(getUserType);

  if (userType === userTypes.ADMIN) {
    return <Navigate to="/admin" />;
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
          <Route path="orders" element={<OrderList />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="printers" element={<PrinterList />} />
          <Route path="*" element={<AdminHome />} />
        </Routes>
      </Container>
    </div>
  );
}
