import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Auth } from "aws-amplify";

export default function NavigationBar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
      <Container>
        <Navbar.Brand onClick={props.titleAction}>🏙 {props.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {props?.config?.map &&
              props.config.map((configObj) => {
                if (configObj.type === "normal") {
                  return <Nav.Link onClick={configObj.action}>{configObj.text}</Nav.Link>;
                } else {
                  return (
                    <NavDropdown title={configObj.text}>
                      {configObj.options.map((dropdownItem) => (
                        <NavDropdown.Item onClick={dropdownItem.action}>{dropdownItem.text}</NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  );
                }
              })}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link
              onClick={async () => {
                try {
                  await Auth.signOut();
                  window.location.reload();
                } catch (error) {
                  console.log("error signing out: ", error);
                }
              }}>
              Sign out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// config format
// const config = [
//   {
//     type: "normal",
//     action: () => {},
//     text: "Home"
//   },
//   {
//     type: "normal",
//     action: () => {},
//     text: "Link"
//   },
//   {
//     type: "dropdown",
//     text: "Big Dropdown",
//     options: [
//       {
//         action: () => {},
//         text: "Action"
//       },
//       {
//         action: () => {},
//         text: "Another Action"
//       }
//     ]
//   }
// ];
