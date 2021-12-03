import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Plus } from "react-bootstrap-icons";

import { getAllOrders, getUserType } from "../../redux";
import { NewOrder, Issues, Shipped, Resolved } from "./Badges";

export default function OrderList(props) {
  const userType = useSelector(getUserType);
  const orders = useSelector(getAllOrders);
  const navigate = useNavigate();

  const usingOrder = props.orders ?? orders;

  return (
    <>
      <h3>🎞 You've got {usingOrder?.length ?? 0} active orders</h3>
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
          {usingOrder?.map &&
            usingOrder
              .sort((a, b) => (a.assigned === "employee name" ? -1 : 1))
              .map((order) => (
                <tr onClick={() => navigate(`/${userType}/orders/${order.orderId}`)}>
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
          {userType === "customer" && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }} onClick={() => navigate(`/${userType}/orders/new`)}>
                <b>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Plus size={30} />
                    <div>Create a new order</div>
                  </div>
                </b>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
