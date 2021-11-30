import React from "react";
import { Table } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { getUserType } from "../../redux";
import { GoodStanding, Probation, Banned } from "./Badges";

export default function PrinterList(props) {
  const userType = useSelector(getUserType);
  const navigate = useNavigate();

  return (
    <>
      <h3>👯‍♀️ Team work makes the dream work!</h3>
      <Table hover style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Num. of Orders</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>37</td>
            <td>
              <GoodStanding />
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>103</td>
            <td>
              <GoodStanding />
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Jeffrey</td>
            <td>Armstrong</td>
            <td>3</td>
            <td>
              <GoodStanding />
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Edward</td>
            <td>James</td>
            <td>28</td>
            <td>
              <Probation />
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Cody</td>
            <td>Turnwood</td>
            <td>16</td>
            <td>
              <Banned />
            </td>
          </tr>
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }} onClick={() => navigate(`/${userType}/printer/new`)}>
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
