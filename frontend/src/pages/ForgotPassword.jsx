import { useState } from "react"
import { useContext, useEffect } from "react"

import UserContext from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const {forgotPassword,user}=useContext(UserContext);

    const onChangeHandler=(e)=>{
        const {value}=e.target
        
        
            setEmail(value)
        }
       
        const handleForgotPassword=(e)=>{   
            e.preventDefault();
            forgotPassword(email)

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
        <h1>Forgot  Password </h1>
            <form>
               
                <div className="form_group">
                    <input type="email" name="email" id="email" value={email} onChange={(e)=>onChangeHandler(e)} placeholder="Enter Your Email"/>
                </div>
             
    
                <div className="form_group">
                    <button type="submit" onClick={(e)=>handleForgotPassword(e)}>Continue</button>
                </div>
            
            </form>
        </div>
    </div>
    </section>    
  )
}

export default ForgotPassword