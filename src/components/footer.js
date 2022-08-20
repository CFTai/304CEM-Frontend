import {Component} from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <footer id="footer">
                {/* <a href="" id="github-url" target="_blank">
                    GITHUB
                </a>
                <a href="" id="github-url" target="_blank">
                    LINKEDIN 
                </a> */}
                <span className="footer-span">
                    304CEM Assignment
                </span>
            </footer>
        )
    }
}
export default Footer;