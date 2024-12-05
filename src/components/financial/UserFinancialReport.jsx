import { useState, useEffect } from "react";
import { useBudgetProvider } from "../../providers/BudgetProvider.jsx";
import FinancialReportCategory from "./FinancialReportCategory.jsx"
import {
  calculateIncomeGroupTotals,
  calculateThresholdPercentage,
  analyzeThresholds,
} from "../../utils/financialCategoryData.js";
import "./UserFinancialReport.scss";

export default function UserFinancialReport() {
  const { userCategoryExpenses, userBudgetSummary } = useBudgetProvider();
  const [thresholdPercentages, setThresholdPercentages] = useState({
    needs: 0,
    wants: 0,
    savings: 0,
  });
  const [thresholdAnalysis, setThresholdAnalysis] = useState({
    needs: "",
    wants: "",
    savings: "",
  });

  // calculate and set values
  useEffect(() => {
    const expenseTotals = calculateIncomeGroupTotals(userCategoryExpenses);
    const expensePercentages = calculateThresholdPercentage(
      expenseTotals,
      userBudgetSummary["total_income"]
    );
    const expenseAnalysis = analyzeThresholds(expensePercentages);

    setThresholdPercentages(expensePercentages);
    setThresholdAnalysis(expenseAnalysis);
  }, [userBudgetSummary]);

  return (
    <div className="user_financial_report app-card flex-column">
      <h2>Financial Report</h2>
      
      <FinancialReportCategory 
      category ={"Needs"}
      percentage={thresholdPercentages.needs} 
      analysis ={thresholdAnalysis.needs}
      />

<FinancialReportCategory 
      category ={"Wants"}
      percentage={thresholdPercentages.wants} 
      analysis ={thresholdAnalysis.wants}
      />

<FinancialReportCategory 
      category ={"Savings"}
      percentage={thresholdPercentages.savings} 
      analysis ={thresholdAnalysis.savings}
      />
   
      {/* <section className="user_financial_report_category">
        {" "}
        <h3>Savings</h3>
        <span className="user_financial_report_category_percentage">
          {thresholdPercentages.savings}%{" "}
        </span>
        <span className="user_financial_report_category_analysis">{thresholdAnalysis.savings}</span>
      </section> */}
      <span className="user_financial_report_subtext subtext-font">
        This financial report is based on the 50/30/20 budgeting rule, which
        suggests allocating 50% of your income to needs, 30% to wants, and 20%
        to savings.
        <br />
        <span>
          {" "}
          <em>
            {" "}
            -Elizabeth Warren, "All Your Worth: The Ultimate Lifetime Money
            Plan"
          </em>
        </span>
      </span>
    </div>
  );
}
