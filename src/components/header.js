import {React, Component} from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header>
              <h2 className="logo">Temp name</h2>
              <div
                onClick={() => {
                  this.props.setActiveClass(this.props.setActiveClass);
                }}
                // className={this.props.activeClass ? "toggle active" : "toggle"}>
                className={"toggle"}>
                </div>
            </header>
        )
    }
}

export default Header;