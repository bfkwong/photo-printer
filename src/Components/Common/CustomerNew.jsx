import React from "react";
import { Accordion, Container, Row, Col, Form, Button } from "react-bootstrap";
import { BagXFill, CheckCircleFill } from "react-bootstrap-icons";

export default function CustomerNew() {
  const [fields, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "change_field":
        return { ...state, [action.fieldId]: action.fieldValue };
      default:
        return state;
    }
  }, {});
  const [orderStatus, setOrderStatus] = React.useState();

  const orderSectionVld = fields.firstName && fields.lastName && fields.email && fields.phone;

  const fieldDispatch = (fieldId, fieldValue) => {
    dispatch({ type: "change_field", fieldId, fieldValue });
  };

  if (orderStatus === "success") {
    return (
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: 30
          }}>
          <CheckCircleFill color="green" size="90" />
          <h4 style={{ marginTop: 30 }}>Order placed!</h4>
        </div>
      </Container>
    );
  }

  if (orderStatus === "error") {
    return (
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: 30
          }}>
          <BagXFill color="red" size="90" />
          <h4 style={{ marginTop: 30 }}>Uh-oh! Something went wrong. Try again later.</h4>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <div style={{ maxWidth: 900 }}>
          <h3 style={{ marginBottom: 30 }}>Add a new customer 🧑‍💼</h3>
          <Accordion activeKey={"0"}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <div>
                    <h5>Tell us about the customer</h5>
                    <p style={{ margin: 0 }}>Some info like name, email address, phone</p>
                  </div>
                  {orderSectionVld && (
                    <div style={{ marginRight: 20 }}>
                      <CheckCircleFill size="25" color="green" />
                    </div>
                  )}
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        value={fields.firstName}
                        onChange={(e) => fieldDispatch("firstName", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        value={fields.lastName}
                        onChange={(e) => fieldDispatch("lastName", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control value={fields.email} onChange={(e) => fieldDispatch("email", e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone number (optional)</Form.Label>
                      <Form.Control value={fields.phone} onChange={(e) => fieldDispatch("phone", e.target.value)} />
                    </Form.Group>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{ marginTop: 15 }}>
            <Form.Check
              type="checkbox"
              label="By clicking this checkbox, you agree to our boring legal stuff and privacy stuff."
              value={fields.tc}
              onChange={(e) => fieldDispatch("tc", e.target.checked)}
            />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10, marginBottom: 80 }}>
            <Button disabled={!fields.tc || !orderSectionVld} onClick={() => setOrderStatus("success")}>
              Add new customer
            </Button>
          </div>
        </div>
      </Row>
    </Container>
  );
}
