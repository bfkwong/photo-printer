import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getAllUsers, SET_ALL_USERS } from "../../redux";
import { updateUserType, getAllUsers as getAllUsersQry } from "../../Service/queries";

export default function Printer(props) {
  const { printerId } = useParams();
  const navigate = useNavigate();
  const allUsers = useSelector(getAllUsers);
  const dispatch = useDispatch();
  const currentUser = (allUsers?.find && allUsers.find((user) => user.UserID === printerId)) ?? {};

  return (
    <div>
      <h3>
        {currentUser.FirstName} {currentUser.LastName} - {currentUser.UserID}
      </h3>
      <Container spacing={3} style={{ marginTop: 15 }}>
        <Row>
          <Col xs={12} sm={6} style={{ padding: 0 }}>
            <h6>Address</h6>
            <p>
              {currentUser.Street}
              <br />
              {currentUser.City}, {currentUser.State}, {currentUser.Zipcode}
            </p>
          </Col>
          <Col xs={12} sm={6} style={{ padding: 0 }}>
            <h6>Tracking Info</h6>
            <p>
              {currentUser.Email}
              <br />
              {currentUser.Phone}
            </p>
          </Col>
          <Col xs={12} sm={6} style={{ padding: 0 }}>
            <h6>User type</h6>
            <Container style={{ padding: 0 }}>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Select
                      value={currentUser.AccessLevel}
                      onChange={async (e) => {
                        await updateUserType(currentUser.UserID, e.target.value);
                        const allUsersResp = await getAllUsersQry();
                        await dispatch({ type: SET_ALL_USERS, payload: allUsersResp !== "ERROR" ? allUsersResp : [] });
                        navigate(`/admin/${e.target.value}s/${currentUser.UserID}`);
                      }}>
                      <option value="customer">🛍 Customer</option>
                      <option value="printer">🖨 Printer</option>
                      <option value="admin">📚 Admin</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
