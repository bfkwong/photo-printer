import React, { useEffect } from "react";
import { Trash2Fill } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Storage } from "aws-amplify";

import { deleteOrder, getAllOrders as getAllOrdersQry } from "../../Service/queries";
import { UploadedImage } from "./OrderNew";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, SET_ALL_ORDERS } from "../../redux";
import { NewOrder } from "./Badges";
import { Col, Container, Row } from "react-bootstrap";

export default function Order(props) {
  const { orderId } = useParams();
  const dispatchRdx = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(getAllOrders);
  const order = orders?.find ? orders.find((ord) => ord.orderId === orderId) : {};
  const [sImageUrls, setSImageUrls] = React.useState([]);

  useEffect(() => {
    setSImageUrls([]);
    order?.imageurl?.forEach &&
      order.imageurl.forEach(async (img) => {
        const url = await Storage.get(img.split("/").slice(2).join("/"), {
          level: "protected"
        });
        setSImageUrls((siu) => [...siu, url]);
      });
  }, [order.imageurl]);

  useEffect(() => {
    console.log(sImageUrls);
  }, [sImageUrls]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>
            {order.orderTitle} - {new Date(order.orderdate).toLocaleDateString()}
          </h3>
        </div>
        <Trash2Fill
          size="25"
          color="red"
          onClick={async () => {
            const delResp = await deleteOrder(orderId);
            if (delResp !== "ERROR") {
              (async () => {
                const allOrdersResp = await getAllOrdersQry();
                dispatchRdx({ type: SET_ALL_ORDERS, payload: allOrdersResp !== "ERROR" ? allOrdersResp : [] });
              })();
              navigate(-1);
            }
          }}
        />
      </div>
      <NewOrder />
      <h6 style={{ marginTop: 20 }}>Order description</h6>
      <p>{order.orderDescription ?? "N/A"}</p>
      <Container spacing={3} style={{ marginTop: 15 }}>
        <Row>
          <Col xs={6} sm={4} style={{ padding: 0 }}>
            <h6>Address</h6>
            <p>
              {order.address}
              <br />
              {order.city}, {order.province}, {order.zipcode}
            </p>
          </Col>
          <Col xs={6} sm={4} style={{ padding: 0 }}>
            <h6>Tracking Info</h6>
            <a href={order.trackingurl}>Shippo tracking link</a>
            <p>
              <i>Tracking: {order.trackingNumber ?? "N/A"}</i>
            </p>
          </Col>
          <Col xs={6} sm={4} style={{ padding: 0 }}>
            <h6>Your printer</h6>
            <p>{order.assigned}</p>
          </Col>
        </Row>
      </Container>
      <hr />
      <h6 style={{ paddingTop: 10 }}>Your master pieces</h6>
      <div style={{ display: "flex", flexWrap: "wrap", marginLeft: -10, marginRight: -10 }}>
        {sImageUrls?.map &&
          sImageUrls.map((img) => {
            return <UploadedImage src={img} hideDelete />;
          })}
      </div>
      <p style={{ color: "#a0a0a0", marginTop: 30 }}>
        <i>If you would like to make changes to your order, please contact your printer</i>
      </p>
    </div>
  );
}
