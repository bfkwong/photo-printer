import React from "react";
import { Accordion, Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { stateAbbrev } from "../../constants";

export default function OrderNew(props) {
  const [activeKey, setActiveKey] = React.useState("0");

  return (
    <Container>
      <Row className="justify-content-md-center">
        <div style={{ maxWidth: 900 }}>
          <h3 style={{ marginBottom: 30 }}>Create a new photo order 📝</h3>
          <Accordion activeKey={activeKey}>
            <Accordion.Item eventKey="0">
              <Accordion.Header onClick={() => setActiveKey("0")}>
                <div>
                  <h5>Tell us about your order</h5>
                  <p style={{ margin: 0 }}>Some info like title, description, shipping address, etc.</p>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Order name</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Order description (optional)</Form.Label>
                      <Form.Control as="textarea" rows={2} />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Address Line 1</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Address Line 2</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Select>
                        {stateAbbrev.map((state) => (
                          <option>{state}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <Button onClick={() => setActiveKey("1")}>Done!</Button>
                    </div>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header onClick={() => setActiveKey("1")}>
                <div>
                  <h5>Show us what you got!</h5>
                  <p style={{ margin: 0 }}>Upload the pictures you want printed</p>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div
                    style={{
                      height: 180,
                      width: 180,
                      border: "1px solid #a0a0a0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      margin: 5
                    }}>
                    <Image
                      src="https://www.fodors.com/wp-content/uploads/2018/10/1_UltimateRome_RomanForum.jpg"
                      style={{ maxWidth: 170, maxHeight: 170 }}
                    />
                  </div>
                  <div
                    style={{
                      height: 180,
                      width: 180,
                      border: "1px solid #a0a0a0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      margin: 5
                    }}>
                    <Image
                      src="https://www.fodors.com/wp-content/uploads/2018/10/1_UltimateRome_RomanForum.jpg"
                      style={{ maxWidth: 170, maxHeight: 170 }}
                    />
                  </div>
                  <div
                    style={{
                      height: 180,
                      width: 180,
                      border: "1px solid #a0a0a0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      margin: 5
                    }}>
                    <Image
                      src="https://www.fodors.com/wp-content/uploads/2018/10/1_UltimateRome_RomanForum.jpg"
                      style={{ maxWidth: 170, maxHeight: 170 }}
                    />
                  </div>
                  <div
                    style={{
                      height: 180,
                      width: 180,
                      border: "1px solid #a0a0a0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      margin: 5
                    }}>
                    <Image
                      src="https://www.fodors.com/wp-content/uploads/2018/10/1_UltimateRome_RomanForum.jpg"
                      style={{ maxWidth: 170, maxHeight: 170 }}
                    />
                  </div>
                  <div
                    style={{
                      height: 180,
                      width: 180,
                      border: "1px solid #a0a0a0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      margin: 5
                    }}>
                    <Image
                      src="https://www.fodors.com/wp-content/uploads/2018/10/1_UltimateRome_RomanForum.jpg"
                      style={{ maxWidth: 170, maxHeight: 170 }}
                    />
                  </div>
                  <div
                    style={{
                      height: 180,
                      width: 180,
                      border: "1px solid #a0a0a0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      margin: 5
                    }}>
                    Add Images
                  </div>
                </div>
                <Row>
                  <Col xs={12}>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <Button onClick={() => setActiveKey("2")}>Next!</Button>
                    </div>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header onClick={() => setActiveKey("2")}>
                <div>
                  <h5>Payments information</h5>
                  <p style={{ margin: 0 }}>Pay us ... please ... we're poor</p>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name on Card</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Zipcode</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Credit Card Number</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Exp. Date</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <Button onClick={() => setActiveKey(null)}>That's all!</Button>
                    </div>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Row>
    </Container>
  );
}
