import React, { useEffect, useState } from "react";
import { useBudgetProvider } from "../../providers/BudgetProvider.jsx";
import { useAuthProvider } from "../../providers/AuthProvider.jsx";
import { useCategoryProvider } from "../../providers/CategoryProvider.jsx";
import AddTransaction from "../transactions/AddTransaction.jsx";
import LineGraph from "../graph/LineGraph.jsx";
import { v4 as uuidv4 } from "uuid";
import { categoryIcons } from "../../utils/categoryIcons.js";
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
  const { categoryObj } = useCategoryProvider();

  const { disposable_income, total_expenses, total_income } = userBudgetSummary;
  return (
    <div className="dashboard">
      <section className="dashboard_header">
        <div className="dashboard_header_left">
          <h2 className="header-font">Welcome, {userAuth.first_name}!</h2>
          <div className="dashboard_header_left_summary subtext-font">
            <li>Disposable Income: ${disposable_income || 0}</li>
            <li>Total Income: ${total_income || 0}</li>
            <li>Total Expenses: ${total_expenses || 0}</li>
          </div>
        </div>
      </section>

      {/* Transactions */}
      <div className="dashboard_transaction_container">
        <section className="dashboard_transaction_container_addTransaction">
          <AddTransaction
            setUserTransactions={setUserTransactions}
            setUserBudgetSummary={setUserBudgetSummary}
            setUserCategoryExpenses={setUserCategoryExpenses}
          />
        </section>

        <section className="dashboard_transaction_container_transactions app-card">
          <h2>Transactions</h2>
          {userTransactions.map(
            ({ category, amount, transaction_date, transaction_type }) => (
              <div
                className="dashboard_transaction_container_transactions_transaction subtext-font"
                key={uuidv4()}
              >
                <span className="dashboard_transaction_container_transactions_transaction_icon">
                  {" "}
                  {React.createElement(categoryIcons[category])}
                </span>
                <div className="dashboard_transaction_container_transactions_transaction_details flex-column-center">
                  <span className="dashboard_transaction_container_transactions_transaction_details_category">
                    {categoryObj[category]}
                  </span>
                  <span className="dashboard_transaction_container_transactions_transaction_details_date">
                    {transaction_date}
                  </span>
                </div>
                <span
                  className={`dashboard_transaction_container_transactions_transaction_amount ${
                    transaction_type === "income" ? "green" : "red"
                  }`}
                >
                  {transaction_type === "income" ? "+ " : "- "}${amount}
                </span>
              </div>
            )
          )}
        </section>
      </div>

      {/* EXPENSES LINE GRAPH */}
      <LineGraph />
    </div>
  );
}
