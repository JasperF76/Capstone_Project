import { Link, useNavigate } from "react-router-dom";

export default function Nav ({ token, setToken }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);

        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
            {token ? (
                <>
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/users/me">Account</Link>
                    <button className="nav-button" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/users/register">Register</Link>
                        <Link className="nav-link" to="/users/login">Login</Link>
                </>
            )}
            </div>
        </nav>
    )
}