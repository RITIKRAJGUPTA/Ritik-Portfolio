import React from 'react';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';

const NavigationBar = ({ darkMode, setDarkMode }) => {
  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home">Ritik's Portfolio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#projects">Projects</Nav.Link>
            <Nav.Link href="#skills">Skills</Nav.Link>
            <Nav.Link href="#certifications">Certifications</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          <Form.Check
            type="switch"
            id="theme-switch"
            label={darkMode ? 'Dark' : 'Light'}
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
