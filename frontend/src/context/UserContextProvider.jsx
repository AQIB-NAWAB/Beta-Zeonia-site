import React from "react";
import UserContext from "./UserContext";
import baseUrl from "./baseUrl";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const UserContextProvider = ({ children }) => {
    const navigate=useNavigate()
    const [user, setUser] = React.useState(null);
    const login = async(email,password) => {
        try{
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              };
const res=await axios.post(`${baseUrl}/login`,{email,password},config);
setUser(res.data.user);
toast.success("Login Successfull");
navigate("/zeonia")

        }catch(error){
            console.log(error.response.data);
            if(error.response.data.succes==false ||error.response.status==401){
                toast.error("Invalid Credentials");
            }
        
        }
    };
    const logout = async() => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          };
        await axios.get(`${baseUrl}/logout`,config);
        toast.success("Logout Successfull");
        navigate("/login")
        setUser(null);
    };

    const register = async(name,email,password) => {
        try{
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              };
            const res=await axios.post(`${baseUrl}/register`,{name,email,password},config);
            setUser(res.data.user);
            toast.success("Register Successfull");
            navigate("/congratulation")
        }catch(error){
            console.log(error.response.data);
            if(error.response.data.succes==false ||error.response.status==401){
                toast.error(error.response.data.message);
            }
        
        }
    }
    const loadUser = async() => {
        try{
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              };
            const res=await axios.get(`${baseUrl}/me`,config);
            setUser(res.data.user);
            navigate("/zeonia")
        }catch(error){
                console.log(error.response.data);

    }
}

const forgotPassword = async(email) => {
    try{
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          };
        const res=await axios.post(`${baseUrl}/password/forgot`,{email},config);
        toast.success("Check Your Email");
        navigate("/login")
    }catch(error){
            console.log(error.response.data);
            if(error.response.data.succes==false ||error.response.status==401){
                toast.error(error.response.data.message);
            }
        
    }

}


const resetPassword = async(token,password,confirmPassword) => {
    try{
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          };
        const res=await axios.put(`${baseUrl}/password/reset/${token}`,{password,confirmPassword},config);
        toast.success("Password Reset Successfull");
        setUser(res.data.user);
        
    }catch(error){
            console.log(error.response.data);
            if(error.response.data.succes==false ||error.response.status==401){
                toast.error(error.response.data.message);
            }
        
    }


}
   
    return (
        <UserContext.Provider value={{ user, login, logout,register,loadUser,forgotPassword,resetPassword }}>
        {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider