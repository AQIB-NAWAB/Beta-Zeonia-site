import { Link } from "react-router-dom"
import "./pages.css"
const Home = () => {
  return (
    <section id="home">
    <div className="container" data-aos="fade-up">

<h1>Regsiter Now To Become Part Of Us</h1>
<p>
Create your account by just  providing your email , password  and become a part of us .
</p>
<button 
 >
 <Link to="/register">

 Register
 </Link>
 </button>
    </div>

    </section>
  )
}

export default Home