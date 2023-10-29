import React from "react";
import { Container, Nav, Navbar, Collapse, NavbarToggler } from "reactstrap";

import "./navbar.scss";
import NavMenu from "./NavMenu/NavMenu";
const NavbarMenu = ({ modalData, setModalData, data }) => {
  return (
    <Navbar expand="md" light>
      <Container className="navbar-container">
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            {data &&
              data.data &&
              data?.data.result[0] &&
              data?.data.result[0].menuComponentResponses && (
                <NavMenu
                  menus={data?.data.result[0].menuComponentResponses}
                  id={data?.data.result[0].id}
                  title={"Root"}
                  count={1}
                  modalData={modalData}
                  setModalData={setModalData}
                />
              )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
