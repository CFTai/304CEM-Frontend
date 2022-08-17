import {Component} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

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

    logout() {
        const cookies = new Cookies();
        cookies.remove("TOKEN", {path: "/"});
        cookies.remove("USERNAME", {path: "/"});
        this.setState({ username : null});
    }

    render() {
        return (
            <header>
                <ul className='navbar'>
                    <li className='home'><Link to={"/"}><a to="/">Home</a></Link></li>
                    <li className='links'><Link to={"/product"}><a to="/home">Product</a></Link></li>
                    <li className='links'><Link to={"/"}><a to="/">About</a></Link></li>
                    {
                        this.state.username ? (
                            <li className='links'><Link to={"/profile"}><a to="/profile">{this.state.username}</a></Link></li>
                        ) : ( <></>)
                    }
                    {
                        this.state.username ? (
                            <li className='login'><a onClick={this.logout}>Logout</a></li>
                        ) : (
                            <li className='login'><Link to={"/login"}><a to="/home">Sign in</a></Link></li>
                        )
                    }
                </ul> 
            </header>
        )
    }
}

export default Header;