import React from "react";
import TransactionCard from "./TransactionCard.jsx";
import "./Transactions.scss";

export default function Transactions({ userTransactions }) {
  return (
    <section className="transactions app-card">
      <h2>Transactions</h2>
      {userTransactions.map((transaction) => (
        <TransactionCard transaction={transaction} />
      ))}
    </section>
  );
}
