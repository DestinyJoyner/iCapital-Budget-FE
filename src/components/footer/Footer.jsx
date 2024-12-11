import {useState, useEffect} from "react"
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import "./Footer.scss";

export default function Footer() {
  // quick fix for hiding footer if on dashboard -> toggle class to hide visibilty
  const location = useLocation()
  // console.log(location)
  const [isVisible, setIsVisible] = useState(true)

useEffect(() => {
  if(location.pathname === "/dashboard"){
    setIsVisible(false)
  }
  else {
    setIsVisible(true)
  }
},[location])


  return (
    <footer className={`footer ${!isVisible? "hide": ""}`}>
      <div className="footer_content">
        <span>© 2024 Destiny Joyner </span>
        <a href="https://github.com/DestinyJoyner" target="_blank">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/destinyjoyner/" target="_blank">
          <FaLinkedin />
        </a>
        <Link to="/">
          <FaHome />
        </Link>
      </div>
    </footer>
  );
}
