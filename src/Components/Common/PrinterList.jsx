import React from "react";
import { Table } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { getUserType } from "../../redux";

export default function PrinterList(props) {
  const userType = useSelector(getUserType);
  const navigate = useNavigate();

  return (
    <>
      <h3>👯‍♀️ Team work makes the dream work!</h3>
      <Table hover style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {props?.printers?.map &&
            props.printers.map((printer) => (
              <tr onClick={() => navigate(`/${userType}/printers/${printer.UserID}`)}>
                <td>{`${printer.FirstName} ${printer.LastName}`}</td>
                <td>{printer.Email}</td>
                <td>{printer.Phone}</td>
              </tr>
            ))}
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }} onClick={() => navigate(`/${userType}/printers/new`)}>
              <b>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Plus size={30} />
                  <div>Invite a new printer</div>
                </div>
              </b>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
