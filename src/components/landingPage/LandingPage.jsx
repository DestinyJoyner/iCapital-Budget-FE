import { Link } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader.jsx";
import { 
    FaWallet,           
    FaChartLine,        
    FaChartBar         
} from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import "./LandingPage.scss";

export default function LandingPage() {
  return (
    <div className="landingPage">
      <AppHeader />
      <section className="landingPage_title">
      <h1>iCapital Budget & Investment Advisory</h1>
      <p className="subtext-font">Personal Finance Management Made Simple</p>
      </section>
      
      <div className ="landingPage_content">
      
      <section className="landingPage_content_left">
      <section className="landingPage_content_left_features">
      <FaWallet />
        <h3>Budget Management</h3>
        <p>Track expenses and income with categorization</p>
      </section>

      <section className="landingPage_content_left_features">
        <FaChartLine />
        <h3>Financial Reports</h3>
        <p>Visualize your spending patterns with interactive charts</p>
      </section>

      <section className="landingPage_content_left_features">
        <FaChartBar />
        <h3>Stock Tracking</h3>
        <p>Monitor market trends with real-time stock data</p>
      </section>
      </section>

      <hr />

      <section className= "landingPage_content_right">
        <div className="landingPage_content_right_about">
        <h3>About</h3>
        <p>A comprehensive financial management application designed to help users track expenses, analyze spending patterns, and make informed investment decisions through real-time market data.</p>
        </div>

        <div className="landingPage_content_right_tech">
          <h3>Technology</h3>
          <li>React</li>
          <li>Node.js</li>
          <li>PostgreSQL</li>
          <li>Chart.js</li>
          <li>Polygon.io API</li>
          <li>Alpha Vantage API</li>
        </div>

        <div className="landingPage_content_right_links">
          <h3>Repositories</h3>
          <li><a href="[your-github-repo]" target="_blank">
        <FaGithub /> Front end repo
      </a></li>
          <li>
          <a href="[your-github-repo]" target="_blank">
          <FaGithub />  Back end repo
      </a>
          </li>
        
       
        </div>

        

        
      </section>
     

      
      </div>
      

      <Link to="/auth" className="landingPage_enter">
        Enter Application
      </Link>
    </div>
  );
}
