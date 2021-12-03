import React from "react";
import { Accordion, Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { BagXFill, CheckCircleFill, XCircleFill } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { Storage } from "aws-amplify";
import Auth from "@aws-amplify/auth";

import { stateAbbrev } from "../../constants";
import { getCogUsername, getUserInfo, SET_ALL_ORDERS } from "../../redux";
import { getAllOrders, postNewOrder } from "../../Service/queries";
import { useDispatch } from "react-redux";

export function UploadedImage(props) {
  return (
    <div className="uploaded-img_container">
      {!props.hideDelete && <XCircleFill size="20" className="upload-img_delete-icon" onClick={props.removeImg} />}
      <Image src={props.src} style={{ maxWidth: 170, maxHeight: 170 }} />
    </div>
  );
}

export default function OrderNew() {
  const dispatchRdx = useDispatch();
  const cogUsername = useSelector(getCogUsername);
  const userInfo = useSelector(getUserInfo);

  const [fields, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "change_field":
          return { ...state, [action.fieldId]: action.fieldValue };
        case "add_images":
          return { ...state, images: [...(state.images ?? []), ...action.newImages] };
        case "remove_image":
          return {
            ...state,
            images: [...state.images.filter((object, idx) => idx !== action.removeIdx ?? false)]
          };
        default:
          return state;
      }
    },
    {
      phone: userInfo?.Phone,
      addr_line1: userInfo?.Street,
      addr_city: userInfo?.City,
      addr_state: userInfo?.State,
      addr_postal: userInfo?.Zipcode,
      billing_name: `${userInfo?.FirstName}${" " + userInfo?.LastName}`
    }
  );
  const [activeKey, setActiveKey] = React.useState("0");
  const [orderStatus, setOrderStatus] = React.useState();

  const orderSectionVld =
    fields.orderName &&
    fields.description &&
    fields.addr_line1 &&
    fields.addr_city &&
    fields.addr_state &&
    fields.addr_postal;
  const photoSectionVld = fields?.images?.length > 0;
  const paymentSectionVld =
    fields.billing_cardnum && fields.billing_name && fields.billing_cvv && fields.billing_expdate && fields.billing_zip;

  const fieldDispatch = React.useCallback((fieldId, fieldValue) => {
    dispatch({ type: "change_field", fieldId, fieldValue });
  }, []);

  React.useEffect(() => {
    fieldDispatch("phone", userInfo?.Phone);
    fieldDispatch("addr_line1", userInfo?.Street);
    fieldDispatch("addr_city", userInfo?.City);
    fieldDispatch("addr_state", userInfo?.State);
    fieldDispatch("addr_postal", userInfo?.Zipcode);
    fieldDispatch("billing_name", `${userInfo?.FirstName}${" " + userInfo?.LastName}`);
  }, [fieldDispatch, userInfo]);

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
          <h3 style={{ marginBottom: 30 }}>Create a new photo order 📝</h3>
          <Accordion activeKey={activeKey}>
            <Accordion.Item eventKey="0">
              <Accordion.Header onClick={() => setActiveKey((ak) => (ak === "0" ? "-1" : "0"))}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <div>
                    <h5>Tell us about your order</h5>
                    <p style={{ margin: 0 }}>Some info like title, description, shipping address, etc.</p>
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
                      <Form.Label>Order name</Form.Label>
                      <Form.Control
                        value={fields.orderName}
                        onChange={(e) => fieldDispatch("orderName", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control value={fields.phone} onChange={(e) => fieldDispatch("phone", e.target.value)} />
                  </Col>
                  <Col xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Order description (optional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={fields.description}
                        onChange={(e) => fieldDispatch("description", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
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
                    <h5>Show us what you got!</h5>
                    <p style={{ margin: 0 }}>Upload the pictures you want printed</p>
                  </div>
                  {photoSectionVld && (
                    <div style={{ marginRight: 20 }}>
                      <CheckCircleFill size="25" color="green" />
                    </div>
                  )}
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {fields?.images?.map((image, idx) => (
                    <UploadedImage
                      addImage
                      src={image.processed}
                      removeImg={() => dispatch({ type: "remove_image", removeIdx: idx })}
                    />
                  ))}
                </div>
                <input
                  type="file"
                  multiple="multiple"
                  onChange={(e) => {
                    dispatch({
                      type: "add_images",
                      newImages: Object.values(e.target.files).map((file) => ({
                        file,
                        processed: URL.createObjectURL(file)
                      }))
                    });
                  }}
                  style={{ color: "white", margin: 10 }}
                />
                <Row>
                  <Col>
                    <p style={{ color: "#a0a0a0", margin: 10 }}>
                      <i>All pictures will be printer 4x6 glossy. Each image costs $0.19 per image</i>
                    </p>
                  </Col>
                  <Col xs={12}>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <Button onClick={() => setActiveKey("2")} disabled={!photoSectionVld}>
                        Next!
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header onClick={() => setActiveKey((ak) => (ak === "2" ? "-1" : "2"))}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <div>
                    <h5>Payments information</h5>
                    <p style={{ margin: 0 }}>Pay us ... please ... we're poor</p>
                  </div>
                  {paymentSectionVld && (
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
                      <Form.Label>Name on Card</Form.Label>
                      <Form.Control
                        value={fields.billing_name}
                        onChange={(e) => fieldDispatch("billing_name", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Zipcode</Form.Label>
                      <Form.Control
                        value={fields.billing_zip}
                        onChange={(e) => fieldDispatch("billing_zip", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Credit Card Number</Form.Label>
                      <Form.Control
                        value={fields.billing_cardnum}
                        onChange={(e) => fieldDispatch("billing_cardnum", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        value={fields.billing_cvv}
                        onChange={(e) => fieldDispatch("billing_cvv", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Exp. Date</Form.Label>
                      <Form.Control
                        value={fields.billing_expdate}
                        onChange={(e) => fieldDispatch("billing_expdate", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <Button onClick={() => setActiveKey(null)} disabled={!paymentSectionVld}>
                        That's all!
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
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10, marginBottom: 80 }}>
            <Button
              disabled={!fields.tc || !orderSectionVld || !photoSectionVld || !paymentSectionVld}
              onClick={async () => {
                const credentials = await Auth.currentUserCredentials();

                const imagesToUpload = [];
                fields.images.forEach((img) => {
                  const currentTime = `${new Date().getTime()}`.split("").reverse().join("");
                  const imgToUpload = `${currentTime}_${img.file.name}`;
                  imagesToUpload.push(imgToUpload);
                  Storage.put(imgToUpload, img.file, {
                    level: "protected"
                  });
                });

                const resp = await postNewOrder({
                  newOrder: {
                    orderTitle: fields.orderName,
                    orderDescription: fields.description,
                    orderPaid: true,
                    userId: cogUsername,
                    storeId: "0000",
                    address: `${fields.addr_line1}${fields.addr_line2 ? ", " : " "}${fields.addr_line2 ?? ""}`,
                    orderdate: new Date().toISOString(),
                    city: `${fields.addr_city}`,
                    zipcode: fields.addr_postal,
                    phone: fields.phone,
                    province: fields.addr_state,
                    imageurl: imagesToUpload.map((img) => `protected/${credentials.identityId}/${img}`),
                    trackingurl: "shippo.com/quihf21fho11if1oi/order1",
                    identityId: credentials.identityId
                  }
                });
                if (resp === "ERROR") {
                  setOrderStatus("error");
                } else {
                  setOrderStatus("success");
                  (async () => {
                    const allOrdersResp = await getAllOrders();
                    dispatchRdx({ type: SET_ALL_ORDERS, payload: allOrdersResp !== "ERROR" ? allOrdersResp : [] });
                  })();
                }
              }}>
              Place the order!
            </Button>
          </div>
        </div>
      </Row>
    </Container>
  );
}
