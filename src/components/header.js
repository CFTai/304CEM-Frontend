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

    render() {
        return (
            <header>
                <ul className='navbar'>
                    <li className='home'><Link to={"/home"}><a to="/home">Home</a></Link></li>
                    <li className='links'><Link to={"/product"}><a to="/home">Product</a></Link></li>
                    <li className='links'><Link to={"/home"}><a to="/home">About</a></Link></li>
                    {
                        this.state.username ? (
                            <li className='links'><Link to={"/profile"}><a to="/profile">{this.state.username}</a></Link></li>
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