import { Link } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader.jsx";
import { 
    FaWallet,           
    FaChartLine,        
    FaChartBar , FaInfoCircle,    FaCode     
} from "react-icons/fa";
import { FaGithub,    } from "react-icons/fa6";
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
          <FaInfoCircle />
          <div className="landingPage_content_right_text">
          <h3>About</h3>
          <p>A comprehensive financial management application designed to help users track expenses, analyze spending patterns, and make informed investment decisions through real-time market data.</p>
          </div>
          
        
        </div>

        <div className="landingPage_content_right_tech">
        <FaCode />
        <div className="landingPage_content_right_text">
          <h3>Technology</h3>
          <li>React</li>
          <li>Node.js</li>
          <li>PostgreSQL</li>
          <li>Chart.js</li>
          <li>Polygon.io API</li>
          <li>Alpha Vantage API</li>
          </div>
        </div>

        <div className="landingPage_content_right_links">
        <FaGithub />
        <div className="landingPage_content_right_text">
          <h3>Repositories</h3>
          <li><a href="https://github.com/DestinyJoyner/iCapital-Budget-FE?tab=readme-ov-file" target="_blank">
       Frontend repo
      </a></li>
          <li>
          <a href="https://github.com/DestinyJoyner/iCapital-Budget-BE" target="_blank">
            Backend repo
      </a>
          </li>
        
          </div>
        </div>

        

        
      </section>
     

      
      </div>
      

      <Link to="/auth" className="landingPage_enter">
        Enter Application
      </Link>
    </div>
  );
}
