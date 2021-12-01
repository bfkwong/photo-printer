import React from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import NavigationBar from "../Common/NavigationBar";
import OrderList from "../Common/OrderList";
import { getAllOrders, getUserType } from "../../redux";
import { userTypes } from "../../constants";
import Order from "../Common/Order";
import OrderNew from "../Common/OrderNew";

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
          { type: "normal", text: "Gallery" }
        ]}
      />
      <Container fluid="sm" style={{ marginTop: 10 }}>
        <Routes>
          <Route path="orders">
            <Route index element={<OrderList orders={orders} />} />
            <Route path=":orderId" element={<Order />} />
            <Route path="new" element={<OrderNew />} />
          </Route>
        </Routes>
      </Container>
    </div>
  );
}
