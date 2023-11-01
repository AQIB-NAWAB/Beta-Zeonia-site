import { useContext, useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext"

const LogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onChangeHandler=(e)=>{
        const {name,value}=e.target
         if(name==="email"){
            setEmail(value)
        }
        else if(name==="password"){
            setPassword(value)
        }
    }
    const {login,user}=useContext(UserContext);
    const handleSubmit=(e)=>{
        e.preventDefault();
        login(email,password);
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
        <h1>LogIn Your Account </h1>
            <form>
                
                <div className="form_group">
                    <input type="email" name="email" id="email" value={email} onChange={(e)=>onChangeHandler(e)} placeholder="Enter Your Email"/>
                </div>
                <div className="form_group">
                    <input type="password" name="password" id="password" value={password} onChange={(e)=>onChangeHandler(e)} placeholder="Enter Your Password"/>
                </div>
    
                <div className="form_group">
                    <button type="submit" onClick={(e)=>handleSubmit(e)}>Log In</button>
                </div>
                <span style={{textAlign:"center",marginTop:"20px"}}>

                <p>Don't have   account ? <Link to={"/register"}>Register</Link></p>
                <p>Don't remember password? <Link to={"/forgot/password"}>forgot password</Link></p>
                </span>

            </form>
        </div>
    </div>
    </section> 
  )
}

export default LogIn