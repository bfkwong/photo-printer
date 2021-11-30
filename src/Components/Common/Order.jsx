import React from "react";
import { useParams } from "react-router-dom";
import { UploadedImage } from "./OrderNew";

export default function Order(props) {
  let { orderId } = useParams();

  return (
    <div>
      <h3>📷 A trip to Rome (#{orderId})</h3>
      <div style={{ display: "flex", flexWrap: "wrap", marginLeft: -10, marginRight: -10 }}>
        <UploadedImage
          src="https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1549318570/production/city/hero_image_2_1549318566.jpg"
          hideDelete
        />
        <UploadedImage
          src="https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1549318570/production/city/hero_image_2_1549318566.jpg"
          hideDelete
        />
        <UploadedImage
          src="https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1549318570/production/city/hero_image_2_1549318566.jpg"
          hideDelete
        />
        <UploadedImage
          src="https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1549318570/production/city/hero_image_2_1549318566.jpg"
          hideDelete
        />
        <UploadedImage
          src="https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1549318570/production/city/hero_image_2_1549318566.jpg"
          hideDelete
        />
        <UploadedImage
          src="https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1549318570/production/city/hero_image_2_1549318566.jpg"
          hideDelete
        />
        <UploadedImage
          src="https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1549318570/production/city/hero_image_2_1549318566.jpg"
          hideDelete
        />
        <UploadedImage
          src="https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1549318570/production/city/hero_image_2_1549318566.jpg"
          hideDelete
        />
        <UploadedImage
          src="https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1549318570/production/city/hero_image_2_1549318566.jpg"
          hideDelete
        />
        <UploadedImage
          src="https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1549318570/production/city/hero_image_2_1549318566.jpg"
          hideDelete
        />
        <UploadedImage
          src="https://cdn.contexttravel.com/image/upload/c_fill,q_60,w_2600/v1549318570/production/city/hero_image_2_1549318566.jpg"
          hideDelete
        />
      </div>
    </div>
  );
}
