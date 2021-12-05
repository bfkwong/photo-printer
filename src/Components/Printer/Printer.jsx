import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import NavigationBar from "../Common/NavigationBar";
import OrderList from "../Common/OrderList";
import { getAllOrders, getUserInfo, getUserType, SET_ALL_ORDERS } from "../../redux";
import { userTypes } from "../../constants";
import Order from "../Common/Order";
import OrderNew from "../Common/OrderNew";
import { useDispatch } from "react-redux";
import { getAllOrdersByStore } from "../../Service/queries";

export default function Printer(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = useSelector(getUserType);
  const userInfo = useSelector(getUserInfo);
  const orders = useSelector(getAllOrders);

  React.useEffect(() => {
    (async () => {
      const allOrdersResp = await getAllOrdersByStore("0000");
      dispatch({ type: SET_ALL_ORDERS, payload: allOrdersResp !== "ERROR" ? allOrdersResp : [] });
    })();
  }, [dispatch]);

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
        config={[{ type: "normal", text: "Orders", action: () => navigate("/printer/orders") }]}
      />
      <Container fluid="sm" style={{ marginTop: 10 }}>
        <Routes>
          <Route path="orders">
            <Route
              index
              element={
                <OrderList orders={orders?.filter && orders.filter((order) => order.assigned === userInfo.UserID)} />
              }
            />
            <Route path=":orderId" element={<Order />} />
            <Route path="new" element={<OrderNew />} />
          </Route>
          <Route path="*" element={<Navigate to="/printer/orders" />}></Route>
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
