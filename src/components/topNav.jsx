import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import logo from '../logo-white-cropped.png';


export const TopNav = () => {

    return(

        <Navbar fixed="top" bg="dark" variant="dark" expand='md' className="justify-content-center">
            <Navbar bg="dark" variant="dark" >
                <Container className="justify-content-center">
                    <Navbar.Brand href="#">
                        <img
                        alt=""
                        src={logo}
                        height="40vp"
                        
                        className="d-inline-block align-middle"
                        />{' '}
                    Cover Convert
                    </Navbar.Brand>
                </Container>
        </Navbar>
        </Navbar>

    ) 
}