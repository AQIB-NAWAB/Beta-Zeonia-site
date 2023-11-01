import { useContext, useEffect } from "react"

import UserContext from "../context/UserContext"
import { useNavigate } from "react-router-dom"
const Zeonia = () => {
  const {user}=useContext(UserContext);
  const navigate=useNavigate()
  useEffect(() => {
      if(!user){
      navigate("/login")
      }
  }, [user])
  return (
    <div id='zeonia_page'>
        <h1 >Beta is Comming !</h1>
        <p>Stay Tuned to email and site to enjoy it </p>
    </div>
  )
}

export default Zeonia