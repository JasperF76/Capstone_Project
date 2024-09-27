import { Link, useNavigate } from "react-router-dom";

export default function Nav({ token, setToken, user, setUser,setIsAdmin }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAdmin(false);
        navigate('/');
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {token ? (
                    <>
                        <span className="nav-username">{user?.username ?? 'User'}</span>
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/users/me">Account</Link>
                        <Link className="nav-link" to="/about">About</Link>
                        <button className="nav-button" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/users/register">Register</Link>
                        <Link className="nav-link" to="/users/login">Login</Link>
                        <Link className="nav-link" to="/about">About</Link>
                    </>
                )}
            </div>
        </nav>
    )
}