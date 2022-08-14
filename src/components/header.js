import {Component} from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header>
                <ul className='navbar'>
                    <li className='home'><a href="./">Home</a></li>
                    <li className='links'><a href="#shop">Shop</a></li>
                    <li className='links'><a href="#about">About</a></li>
                    <li className='login'><a href="login">Sign in</a></li>
                </ul> 
            </header>
        )
    }
}

export default Header;