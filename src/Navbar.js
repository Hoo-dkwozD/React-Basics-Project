import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h1><Link to="/">Blogpost</Link></h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link id="a-btn-add" to="/create">New Blog</Link>
            </div>
        </nav>
    );
}

export default Navbar;