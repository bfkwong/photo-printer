import React from "react";
import { Modal, Button, Accordion, Col, Row, Form, Container } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { stateAbbrev } from "../../constants";
import { getCompletedFTU, getUserType, SET_COMPLETED_FTU, SET_USER_INFO } from "../../redux";
import { getUserInfo, postUserInfo } from "../../Service/queries";

export default function FTU(props) {
  const dispatchRdx = useDispatch();
  const completedFtu = useSelector(getCompletedFTU);
  const userType = useSelector(getUserType);

  const [activeKey, setActiveKey] = React.useState("0");
  const navigate = useNavigate();
  const [fields, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "change_field":
        return { ...state, [action.fieldId]: action.fieldValue };
      default:
        return state;
    }
  }, {});

  const fieldDispatch = (fieldId, fieldValue) => {
    dispatch({ type: "change_field", fieldId, fieldValue });
  };

  const orderSectionVld = fields.firstName && fields.lastName && fields.phone;
  const addressVld = fields.addr_line1 && fields.addr_state && fields.addr_city && fields.addr_postal;

  if (completedFtu) {
    return <Navigate to={-1} />;
  }

  return (
    <Modal
      show
      onHide={() => {
        navigate(-1);
      }}
      fullscreen>
      <Modal.Header>
        <Modal.Title>Welcome to photo printer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container style={{ maxWidth: 750 }}>
          <Accordion activeKey={activeKey}>
            <Accordion.Item eventKey="0">
              <Accordion.Header onClick={() => setActiveKey((ak) => (ak === "0" ? "-1" : "0"))}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <div>
                    <h5>Tell us about yourself</h5>
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
                      <Form.Label>Phone number</Form.Label>
                      <Form.Control value={fields.phone} onChange={(e) => fieldDispatch("phone", e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <Button onClick={() => setActiveKey("1")} disabled={!orderSectionVld}>
                        Done!
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header onClick={() => setActiveKey((ak) => (ak === "1" ? "-1" : "1"))}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <div>
                    <h5>Where you at?</h5>
                    <p style={{ margin: 0 }}>We need your address for ... reasons</p>
                  </div>
                  {addressVld && (
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
                      <Form.Label>Address Line 1</Form.Label>
                      <Form.Control
                        value={fields.addr_line1}
                        onChange={(e) => fieldDispatch("addr_line1", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Address Line 2</Form.Label>
                      <Form.Control
                        value={fields.addr_line2}
                        onChange={(e) => fieldDispatch("addr_line2", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        value={fields.addr_city}
                        onChange={(e) => fieldDispatch("addr_city", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Select
                        value={fields.addr_state}
                        onChange={(e) => fieldDispatch("addr_state", e.target.value)}>
                        <option>Select a state</option>
                        {stateAbbrev.map((state) => (
                          <option value={state}>{state}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        value={fields.addr_postal}
                        onChange={(e) => fieldDispatch("addr_postal", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <Button onClick={() => setActiveKey("-1")} disabled={!addressVld}>
                        There ya go!
                      </Button>
                    </div>
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
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          disabled={!fields.tc || !orderSectionVld || !addressVld}
          onClick={async () => {
            const create = await postUserInfo({
              Street: `${fields.addr_line1}${fields.addr_line2 ? ", " : " "}${fields.addr_line2 ?? ""}`,
              City: fields.addr_city,
              State: fields.addr_state,
              Zipcode: fields.addr_postal,
              FirstName: fields.firstName,
              LastName: fields.lastName,
              Phone: fields.phone
            });
            if (create !== "ERROR") {
              const userInfo = await getUserInfo();
              dispatch({ type: SET_USER_INFO, payload: userInfo });

              dispatchRdx({ type: SET_COMPLETED_FTU, payload: true });
              navigate(`/${userType}`);
            }
          }}>
          Complete sign up
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
