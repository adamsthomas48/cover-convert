import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

export const TopNav = () => {

    return(

        <Navbar fixed="top" bg="dark" variant="dark" expand='sm' className="">
            <Container className="reduced justify-content-center">
            <Navbar.Brand href="#">Cover Convert</Navbar.Brand>
            
            </Container>
        </Navbar>

    ) 
}