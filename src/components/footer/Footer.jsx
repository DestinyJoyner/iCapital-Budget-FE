import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
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
