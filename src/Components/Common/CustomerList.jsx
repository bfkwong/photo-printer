import React from "react";
import { Table } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { getUserType } from "../../redux";
import { GoodStanding, Probation, Banned } from "./Badges";

export default function CustomerList(props) {
  const userType = useSelector(getUserType);
  const navigate = useNavigate();

  return (
    <>
      <h3>🙋‍♀️ Wow, that's a lot of customers!</h3>
      <Table hover style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props?.customers?.map &&
            props.customers.map((customer) => (
              <tr onClick={() => navigate(`/${userType}/customers/${customer.UserID}`)}>
                <td>{`${customer.FirstName} ${customer.LastName}`}</td>
                <td>{customer.Email}</td>
                <td>
                  <GoodStanding />
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }} onClick={() => navigate(`/${userType}/customers/new`)}>
              <b>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Plus size={30} />
                  <div>Invite a new customer</div>
                </div>
              </b>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
