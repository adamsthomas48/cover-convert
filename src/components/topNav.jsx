import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';


export const TopNav = () => {

    return(

        <Navbar fixed="top" bg="dark" variant="dark" expand='sm' className="">
            <Navbar bg="dark" variant="dark" >
                <Container className="justify-content-center">
                    <Navbar.Brand href="#">
                        <img
                        alt=""
                        src="/logo-white.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                    Cover Convert
                    </Navbar.Brand>
                </Container>
        </Navbar>
        </Navbar>

    ) 
}