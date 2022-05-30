import { Outlet } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const linkStyle = {
  textDecoration: "none",
  color: "white"
}

const NavigationBar = () => {
  return (
    <>
      {/* <header className="navbar">
          <div className='navTitle navItem'>
            304CEM-Frontend
          </div>
          <div className='navItem'>
            <Link to="/" style={linkStyle}>Home</Link>
          </div>
          <div className='navItem'>
            <Link to="/login" style={linkStyle}>Login</Link>
          </div>
        </header> */}
      <Navbar collapseOnSelect fixed='top' expand='sm' variant='dark'>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={require('../images/instagram.png')}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav' className="justify-content-end">
            <Nav>
              <Nav.Link href='/' style={linkStyle}>
                Home
              </Nav.Link>
              <Nav.Link href='/login' style={linkStyle}>
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default NavigationBar;