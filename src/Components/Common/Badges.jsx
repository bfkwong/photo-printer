import { Badge } from "react-bootstrap";

export const GoodStanding = () => (
  <Badge pill bg="primary">
    Good standing 👩‍💼
  </Badge>
);

export const Probation = () => (
  <Badge pill bg="warning">
    Probation 🤷‍♂️
  </Badge>
);

export const Banned = () => (
  <Badge pill bg="danger">
    Banned 🙅‍♂️
  </Badge>
);

export const NewOrder = () => (
  <Badge pill bg="primary">
    New Order 📥
  </Badge>
);

export const Issues = () => (
  <Badge pill bg="danger">
    Issue 🚨
  </Badge>
);

export const Shipped = () => (
  <Badge pill bg="info">
    Shipped 🚀
  </Badge>
);

export const Resolved = () => (
  <Badge pill bg="success">
    Resolved 🎉
  </Badge>
);

export const CustomerBdg = (props) => (
  <Badge pill bg="primary" style={{ marginRight: 10 }} onClick={props.onClick}>
    🛍 Customer
  </Badge>
);

export const PrinterBdg = (props) => (
  <Badge pill bg="success" onClick={props.onClick}>
    🖨 Printer
  </Badge>
);
