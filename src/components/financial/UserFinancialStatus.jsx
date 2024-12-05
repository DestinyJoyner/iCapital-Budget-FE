import {useState, useEffect} from "react"
import {useBudgetProvider} from "../../providers/BudgetProvider.jsx"
import {
    calculateIncomeGroupTotals,
    calculateThresholdPercentage,
    analyzeThresholds

} from "../../utils/financialCategoryData.js"
import "./UserFinancialStatus.scss"

export default function userFinancialStatus() {

    return <div classname="user_financial_status">
        Finances
    </div>
}