
import { Link } from "react-router-dom"
import "./pages.css"
const Congratulation = () => {
  return (
    <div id='congratulation_page'>

        <h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZmuKAcidUGtYLV1o5EJVgHz9V4O40ij27z9kbRqFHA&s" alt="" />
        Congratulation to be a part of us .</h1>
        
        <Link to={"/zeonia"}>Return to home page</Link>
    </div>
  )
}

export default Congratulation