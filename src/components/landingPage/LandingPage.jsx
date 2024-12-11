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
        <p> Track expenses and income with detailed categorization, monitor your available balance, and maintain a clear overview of your financial health.</p>
      </section>

      <section className="landingPage_content_left_features">
        <FaChartLine />
        <h3>Financial Reports</h3>
        <p>Visualize your spending patterns with interactive charts. Analyze expense distributions and gain insights into your financial habits through dynamic data visualization.</p>
      </section>

      <section className="landingPage_content_left_features">
        <FaChartBar />
        <h3>Stock Tracking</h3>
        <p>Monitor market trends with real-time stock data. Access key metrics like earnings per share, calculate potential returns based on your savings, and make informed investment decisions.</p>
      </section>
      </section>

      <hr />

      <section className= "landingPage_content_right">
        <div className="landingPage_content_right_about">
          <FaInfoCircle />
          <h3>About</h3>
          <div className="landingPage_content_right_text">
          {/* <h3>About</h3> */}
          <p>A comprehensive financial management application designed to help users track expenses, analyze spending patterns, and make informed investment decisions through real-time market data.</p>
          </div>
          
        
        </div>

        <div className="landingPage_content_right_tech">
        <FaCode />
        <h3>Technology Utilized</h3>
        <div className="landingPage_content_right_text">
          {/* <h3>Technology</h3> */}
          <li>React</li>
          <li>React Router Dom</li>
          <li>Financial Modeling Prep API</li>
          <li>Chart.js</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>CORS</li>
          <li>PostgreSQL</li>
          <li>pg-promise</li>
          <li>Nodemailer</li>
          
          <li>EJS</li>
          <li>JSON Web Tokens (JWT)</li>
<li>Bcrypt</li>
<li>Gmail SMTP</li>
<li>Crypto</li>
         
          
          </div>
        </div>

        <div className="landingPage_content_right_links">
        <FaGithub />
        <h3>Repositories</h3>
        <div className="landingPage_content_right_text">
          {/* <h3>Repositories</h3> */}
          <li><a href="https://github.com/DestinyJoyner/iCapital-Budget-FE?tab=readme-ov-file" target="_blank">
       Frontend Repository
      </a></li>
          <li>
          <a href="https://github.com/DestinyJoyner/iCapital-Budget-BE" target="_blank">
            Backend Repository
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
