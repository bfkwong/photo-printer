import React from "react";
import NavigationBar from "../Common/NavigationBar";
import { useNavigate } from "react-router-dom";

export default function Printer(props) {
  const navigate = useNavigate();

  return (
    <div>
      <NavigationBar
        title="Printer"
        titleAction={() => navigate("/printer")}
        config={[
          { type: "normal", text: "Orders" },
          { type: "normal", text: "Customers" }
        ]}></NavigationBar>
    </div>
  );
}
