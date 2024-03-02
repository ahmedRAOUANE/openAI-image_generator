import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div className="container box">
                <div className="box">
                    <h2>Logo</h2>
                </div>
                <ul className="box">
                    <li className="button"><Link to='/openAI-image_generator'>home</Link></li>
                    <li className="button"><Link to='/about'>about</Link></li>
                    <li className="button"><Link to='/contact'>contact</Link></li>
                    <li className="button"><Link to='/openAI-image_generator/login'>login</Link></li>
                    <li className="button"><Link to='/openAI-image_generator/signup'>signup</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header;