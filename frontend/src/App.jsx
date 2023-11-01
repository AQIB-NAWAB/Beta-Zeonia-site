import {  Routes,Route  } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import toast, { Toaster } from 'react-hot-toast';
import Congratulation from './pages/Congratulation';
import Zeonia from './pages/Zeonia';
import { useContext } from "react"
import UserContext from './context/UserContext'; 

const App = () => {
  const {loadUser}=useContext(UserContext);

  useEffect(() => {
    AOS.init();
loadUser()
  }, [])
  return (
    <>
<Navbar/>

<Routes>

  <Route path="/" element={<Home/>} />
  <Route path="/register" element={<Register/>} />
  <Route path="/logIn" element={<LogIn/>} />
  <Route path="/forgot/password" element={<ForgotPassword/>} />
  <Route path="/reset/password/:token" element={<ResetPassword/>} />
  <Route path="/congratulation" element={<Congratulation/>} />
  <Route path="/zeonia" element={<Zeonia/>} />
  
  



</Routes>
<Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#416dcc',
      color: '#fff',
      fontFamily:"Poppins",
      fontSize:"14px"

    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
    </>
  )
}

export default App