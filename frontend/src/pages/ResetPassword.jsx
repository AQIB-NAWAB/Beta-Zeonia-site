import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router-dom"
import UserContext from "../context/UserContext"


const ResetPassword = () => {
    const [confirmPassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const {resetPassword,user}=useContext(UserContext);

    const onChangeHandler=(e)=>{
        const {name,value}=e.target
        if(name==="cPassword"){
            setConfirmPassword(value)
        }
        else if(name==="password"){
            setPassword(value)
        }
    }
    const {token}=useParams()
    const handleSubmit=(e)=>{
        e.preventDefault();
        resetPassword(token,password,confirmPassword)
        
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
        <h1>Reset  Your Password </h1>
            <form>
               
                
                <div className="form_group">
                    <input type="password" name="password" id="password" value={password} onChange={(e)=>onChangeHandler(e)} placeholder="Enter New Password"/>
                </div>
                <div className="form_group">
                    <input type="password" name="cPassword" id="cPassword" value={confirmPassword} onChange={(e)=>onChangeHandler(e)} placeholder="Confirm Password "/>
                </div>
                <div className="form_group">
                    <button type="submit" onClick={(e)=>handleSubmit(e)}>Update</button>
                </div>
                <p>Don't want to change password ? <Link to={"/logIn"}>Log In</Link></p>
            </form>
        </div>
    </div>
    </section> 
  )
}

export default ResetPassword