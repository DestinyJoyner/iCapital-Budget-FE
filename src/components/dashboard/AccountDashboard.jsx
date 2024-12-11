import React, { useEffect, useState } from "react";
import StockAPIProvider from "../../providers/StockAPIProvider.jsx";
import { useBudgetProvider } from "../../providers/BudgetProvider.jsx";
import { useAuthProvider } from "../../providers/AuthProvider.jsx";

import AddTransaction from "../transactions/AddTransaction.jsx";
import LineGraph from "../graph/LineGraph.jsx";
import LogOutButton from "../logout/LogOutButton.jsx";
import DeleteAccount from "../deleteAccount/DeleteAccount.jsx";
import Transactions from "../transactions/Transactions.jsx";
import UserFinancialReport from "../financial/UserFinancialReport.jsx";
import ProjectedEarnings from "../projectedEarnings/ProjectedEarnings.jsx";
// import StockData from "../polygon-io/StockData.jsx"
// import {stockTickers} from "../../utils/stockTickers.js"
// import { v4 as uuidv4 } from "uuid";
import "./AccountDashboard.scss";

export default function AccountDashboard() {
  const {
    userTransactions,
    setUserTransactions,
    userBudgetSummary,
    setUserBudgetSummary,
    setUserCategoryExpenses,
  } = useBudgetProvider();
  const { userAuth } = useAuthProvider();

  const { disposable_income, total_expenses, total_income } = userBudgetSummary;

  // const [ticker, setTicker] = useState("AAPL")

  return (
    <div className="dashboard">
      <section className="dashboard_header">
        <div className="dashboard_header_left">
          <h2 className="header-font">Welcome, {userAuth.first_name}!</h2>
          <span className="dashboard_header_buttons">
            <LogOutButton />
            <DeleteAccount />
          </span>
          <div className="dashboard_header_left_summary subtext-font">
            <li>Balance: ${disposable_income || 0}</li>
            <li>Total Income: ${total_income || 0}</li>
            <li>Total Expenses: ${total_expenses || 0}</li>
          </div>
        </div>
      </section>

      {/* Transactions */}
      <div className="dashboard_transaction_container">
        <AddTransaction
          setUserTransactions={setUserTransactions}
          setUserBudgetSummary={setUserBudgetSummary}
          setUserCategoryExpenses={setUserCategoryExpenses}
        />

        <Transactions userTransactions={userTransactions} />

        {/* User Financial Analysis */}
        <UserFinancialReport />
      </div>

      {/* EXPENSES LINE GRAPH */}
      <LineGraph />
      <StockAPIProvider>
        <ProjectedEarnings />
      </StockAPIProvider>
      {/* STOCK DATA POLYGON API */}
      {/* <StockData ticker ={ticker} setTicker={setTicker} /> */}
    </div>
  );
}
