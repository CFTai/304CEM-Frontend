import {Component} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : null
        }
    }

    componentDidMount() {
        const cookies = new Cookies();
        this.setState({username: cookies.get("USERNAME") || null})
    }

    render() {
        const logout = () => {
            const cookies = new Cookies();
            cookies.remove("TOKEN", {path: "/"});
            cookies.remove("USERNAME", {path: "/"});
            this.setState({username: null}, () => {
                window.location.reload();
            });
        }
        return (
            // <header>
            //     <ul className='navbar'>
            //         <li className='home'><Link to={"/"}><a to="/">Home</a></Link></li>
            //         <li className='links'><Link to={"/product"}><a to="/home">Product</a></Link></li>
            //         {
            //             this.state.username ? (
            //                 <li className='links'><Link to={"/profile"}><a to="/profile">{this.state.username}</a></Link></li>
            //             ) : ( <></>)
            //         }
            //         {
            //             this.state.username ? (
            //                 <li className='login'><a onClick={logout}>Logout</a></li>
            //             ) : (
            //                 <li className='login'><Link to={"/login"}><a to="/home">Sign in</a></Link></li>
            //             )
            //         }
            //     </ul> 
            // </header>
            <Navbar bg="light" expand="lg">
                <Container>
                <Navbar.Brand href="/">304CEM</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link href="/Product">Product</Nav.Link>
                        {
                             this.state.username ? (
                                <NavDropdown title={this.state.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Item><a onClick={logout}>Logout</a></NavDropdown.Item>
                                </NavDropdown>
                             ) : (
                                <NavDropdown title="Menu" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
                                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                </NavDropdown>
                             )
                        }
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Header;