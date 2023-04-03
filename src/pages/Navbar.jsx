import { Container, Nav, Navbar } from "react-bootstrap";
import React from "react";

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">CertiChain</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/add">Add Certificate</Nav.Link>
            <Nav.Link href="/verify">Verify</Nav.Link>
            <Nav.Link href="/owner"> Add Certifier</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
