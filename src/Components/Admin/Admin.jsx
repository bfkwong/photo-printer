import React from "react";
import NavigationBar from "../Common/NavigationBar";
import { useNavigate } from "react-router-dom";

export default function Admin(props) {
  const navigate = useNavigate();

  return (
    <div>
      <NavigationBar
        title="Admin"
        titleAction={() => navigate("/admin")}
        config={[
          { type: "normal", text: "Orders" },
          { type: "normal", text: "Customers" },
          { type: "normal", text: "Printers" }
        ]}></NavigationBar>
    </div>
  );
}
