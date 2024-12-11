import React from "react";
import TransactionCard from "./TransactionCard.jsx";
import { v4 as uuidv4 } from "uuid";
import "./Transactions.scss";

export default function Transactions({ userTransactions }) {
  return (
    <section className="transactions app-card">
      <h2>Transactions</h2>
      {
      userTransactions.length > 0 ? userTransactions.map((transaction) => (
        <TransactionCard transaction={transaction} key={uuidv4()} />
      )):
      <div className="transactions_none">
        <h4>No transactions to display.</h4>
        <span className="subtext-font">Get started by adding your income and expenses using the form </span>
      </div>
      }
    </section>
  );
}
