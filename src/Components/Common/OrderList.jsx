import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Plus } from "react-bootstrap-icons";

import { getUserType } from "../../redux";
import { NewOrder, Issues, Shipped, Resolved } from "./Badges";

const samplePayload = [
  {
    id: "1",
    title: "Trip to Rome",
    customer: "Mark",
    printer: "Otto",
    status: "new_order"
  },
  {
    id: "2",
    title: "Company retreat to Big Sur",
    customer: "Jacob",
    printer: "Thornton",
    status: "issue"
  },
  {
    id: "3",
    title: "Cal Poly orientation",
    customer: "Jeffrey",
    printer: "Armstrong",
    status: "shipped"
  },
  {
    id: "4",
    title: "Big Boba Convention",
    customer: "Edward",
    printer: "James",
    status: "shipped"
  },
  {
    id: "5",
    title: "JavaScript Convention",
    customer: "Cody",
    printer: "Turnwood",
    status: "resolved"
  }
];

export default function OrderList(props) {
  const userType = useSelector(getUserType);
  const navigate = useNavigate();

  return (
    <>
      <h3>🎞 You've got 3 active orders</h3>
      <Table hover style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Customer</th>
            <th>Printer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {(props.orders ?? samplePayload).map((order) => (
            <tr onClick={() => navigate(`/${userType}/orders/${order.id}`)}>
              <td>{order.id}</td>
              <td>{order.title}</td>
              <td>{order.customer}</td>
              <td>{order.printer}</td>
              <td>
                {order.status === "new_order" && <NewOrder />}
                {order.status === "issue" && <Issues />}
                {order.status === "shipped" && <Shipped />}
                {order.status === "resolved" && <Resolved />}
              </td>
            </tr>
          ))}
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
        </tbody>
      </Table>
    </>
  );
}
