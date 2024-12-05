import { Link } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader.jsx";
import { 
    FaWallet,           
    FaChartLine,        
    FaChartBar         
} from "react-icons/fa";
import "./LandingPage.scss";

export default function LandingPage() {
  return (
    <div className="landingPage">
      <AppHeader />
      <h1>iCapital Budget & Investment Advisory</h1>
      <p className="subtext-font">Personal Finance Management Made Simple</p>

      <section className="landingPage_features">
      <FaWallet />
        <h3>Budget Management</h3>
        <p>Track expenses and income with categorization</p>
      </section>

      <section className="landingPage_features">
        <FaChartLine />
        <h3>Financial Reports</h3>
        <p>Visualize your spending patterns with interactive charts</p>
      </section>

      <section className="landingPage_features">
        <FaChartBar />
        <h3>Stock Tracking</h3>
        <p>Monitor market trends with real-time stock data</p>
      </section>

      <Link to="/auth" className="landingPage_enter">
        Enter Application
      </Link>
    </div>
  );
}
