import React from "react";
import NavigationBar from "../Common/NavigationBar";
import { useNavigate } from "react-router-dom";

export default function Customer(props) {
  const navigate = useNavigate();

  return (
    <div>
      <NavigationBar
        title="Customer"
        titleAction={() => navigate("/customer")}
        config={[
          { type: "normal", text: "Orders" },
          { type: "normal", text: "Gallery" }
        ]}></NavigationBar>
    </div>
  );
}
