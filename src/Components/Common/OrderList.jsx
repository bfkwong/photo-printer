import React from "react";
import { Badge, Table } from "react-bootstrap";

const NewOrder = () => (
  <Badge pill bg="primary">
    New Order 📥
  </Badge>
);

const Issues = () => (
  <Badge pill bg="danger">
    Issue 🚨
  </Badge>
);

const Shipped = () => (
  <Badge pill bg="info">
    Shipped 🚀
  </Badge>
);

const Resolved = () => (
  <Badge pill bg="success">
    Resolved 🎉
  </Badge>
);

export default function OrderList(props) {
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
          <tr>
            <td>1</td>
            <td>Trip to Rome</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <NewOrder />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Company retreat to Big Sur</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>
              <Issues />
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Cal Poly orientation day</td>
            <td>Jeffrey</td>
            <td>Armstrong</td>
            <td>
              <Shipped />
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Big Boba Convention</td>
            <td>Edward</td>
            <td>James</td>
            <td>
              <Shipped />
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>JavaScript FHSC Conference</td>
            <td>Cody</td>
            <td>Turnwood</td>
            <td>
              <Resolved />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
