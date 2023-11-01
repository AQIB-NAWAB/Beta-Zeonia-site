import { useEffect, useState } from "react"
import "./pages.css"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext"
import { useContext } from "react"

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {register,user}=useContext(UserContext);

    const onChangeHandler=(e)=>{
        const {name,value}=e.target
        if(name==="name"){
            setName(value)
        }
        else if(name==="email"){
            setEmail(value)
        }
        else if(name==="password"){
            setPassword(value)
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        register(name,email,password);

    }
    const navigate=useNavigate()
    useEffect(() => {
        if(user){
        navigate("/zeonia")
        }
    }, [user])
  return (
<section id="register_page">
<div className="container" data-aos="fade-down">
    <div className="register_form">
    <h1>Register Your Account </h1>
        <form>
            <div className="form_group">
                <input type="text" name="name" value={name} onChange={(e)=>onChangeHandler(e)} id="name" placeholder="Enter Your Name"/>
            </div>
            <div className="form_group">
                <input type="email" name="email" id="email" value={email} onChange={(e)=>onChangeHandler(e)} placeholder="Enter Your Email"/>
            </div>
            <div className="form_group">
                <input type="password" name="password" id="password" value={password} onChange={(e)=>onChangeHandler(e)} placeholder="Enter Your Password"/>
            </div>

            <div className="form_group">
                <button type="submit" onClick={(e)=>handleSubmit(e)}>Regsiter</button>
            </div>
            <p>Already have account ? <Link to={"/logIn"}>Log In</Link></p>
        </form>
    </div>
</div>
</section>    
  )
}

export default Register