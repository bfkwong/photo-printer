import React from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import NavigationBar from "../Common/NavigationBar";
import OrderList from "../Common/OrderList";

export default function Customer(props) {
  const navigate = useNavigate();

  return (
    <div>
      <NavigationBar
        title="Customer"
        titleAction={() => navigate("/customer")}
        config={[
          { type: "normal", text: "Orders", action: () => navigate("/customer/orders") },
          { type: "normal", text: "Gallery" }
        ]}
      />
      <Container fluid="sm" style={{ marginTop: 10 }}>
        <Routes>
          <Route path="orders" element={<OrderList />}></Route>
        </Routes>
      </Container>
    </div>
  );
}
