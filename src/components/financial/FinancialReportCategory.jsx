import { 
    FaCheckCircle,     
    FaExclamationCircle,  
    FaTimesCircle    
} from "react-icons/fa";
import "./FinancialReportCategory.scss"

export default function FinancialReportCategory({category, percentage, analysis}) {

    function generateIcon (category, percentage){
        if(category.toLowerCase() === "needs"){
            if(percentage > 60){
                return <FaTimesCircle color={"red"} />
            }
            else if(percentage > 55){
                return <FaExclamationCircle color={"yellow"} />
            }
            else {
                return <FaCheckCircle color={"green"} />
            }
        }

        if(category.toLowerCase() === "wants"){
            if(percentage > 40){
                return <FaTimesCircle color={"red"} />
            }
            else if(percentage > 35){
                return <FaExclamationCircle color={"yellow"} />
            }
            else {
                return <FaCheckCircle color={"green"} />
            }
        }

        if(category.toLowerCase() === "savings"){
            if(percentage < 10){
                return <FaTimesCircle color={"red"} />
            }
            else if(percentage < 15){
                return <FaExclamationCircle color={"yellow"} />
            }
            else {
                return <FaCheckCircle color={"green"} />
            }
        }
    }

    return(
        <section className="user_financial_report_category">
        {" "}
        <h3>{category}</h3>
        <>{generateIcon(category, percentage)}</>
        <span className="user_financial_report_category_percentage">
          {percentage}%
        </span>
        <span className="user_financial_report_category_analysis">{analysis}</span>
      </section>
    )
}