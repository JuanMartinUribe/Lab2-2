import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Mi Tienda de Libros</Navbar.Brand>
                    </LinkContainer>      
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/'>  
                                <Nav.Link>Inicio</Nav.Link>
                            </LinkContainer>     
                            <LinkContainer to='/about'>  
                                <Nav.Link>Acerca de</Nav.Link>
                            </LinkContainer>                               
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header
