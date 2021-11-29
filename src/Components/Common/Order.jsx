import React from "react";
import { useParams } from "react-router-dom";

export default function Order(props) {
  let { orderId } = useParams();

  return (
    <div>
      <h3>📷 A trip to Rome (#{orderId})</h3>
    </div>
  );
}
