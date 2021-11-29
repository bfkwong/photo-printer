import React from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import NavigationBar from "../Common/NavigationBar";
import OrderList from "../Common/OrderList";
import { getUserType } from "../../redux";
import { userTypes } from "../../constants";

export default function Customer(props) {
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
