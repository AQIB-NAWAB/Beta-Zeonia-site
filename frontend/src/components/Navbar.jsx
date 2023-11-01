import { Link } from "react-router-dom";
import "./components.css"
import UserContext from "../context/UserContext"
import { useContext } from "react"

const Navbar = () => {
  const {user,logout}=useContext(UserContext);
const handleLogout=(e)=>{
e.preventDefault();
logout()
}
  return (
    <nav>
        <h1>
        <Link to={"/zeonia"}>

        Zeonia
        </Link>
        </h1>
        <div className="links">
{
    !user ? <>
    <Link to="/register">Regsiter</Link>
    <Link to="/login">Login</Link>
    </>:
    <button className="logout_btn" onClick={(e)=>handleLogout(e)}>Logout</button>
}
        </div>
    </nav>
  )
}

export default Navbar