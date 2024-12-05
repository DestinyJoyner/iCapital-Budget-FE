import {useState, useEffect} from "react"
import {useBudgetProvider} from "../../providers/BudgetProvider.jsx"
import {
    calculateIncomeGroupTotals,
    calculateThresholdPercentage,
    analyzeThresholds

} from "../../utils/financialCategoryData.js"
import "./UserFinancialReport.scss"

export default function UserFinancialReport() {
    const {userCategoryExpenses, userBudgetSummary} = useBudgetProvider()
    const [thresholdPercentages, setThresholdPercentages] = useState({
        needs: 0,
        wants: 0,
        savings: 0
    })
    const [thresholdAnalysis, setThresholdAnalysis] = useState({
        needs: "",
        wants: "",
        savings: ""
    })


    // calculate and set values
    useEffect(() => {
        const expenseTotals = calculateIncomeGroupTotals(userCategoryExpenses)
        const expensePercentages = calculateThresholdPercentage(expenseTotals, userBudgetSummary["total_income"])
        const expenseAnalysis = analyzeThresholds(expensePercentages)

        setThresholdPercentages(expensePercentages)
        setThresholdAnalysis(expenseAnalysis)
    },[])




    return( 
    <div className="user_financial_report app-card">
        <h2>Financial Report</h2>
       <p> Needs : {thresholdPercentages.needs}% {thresholdAnalysis.needs}</p>
       <p> Wants : {thresholdPercentages.wants}% {thresholdAnalysis.wants}</p>
       <p> Savings : {thresholdPercentages.savings}% {thresholdAnalysis.savings}</p>
    </div>
)}