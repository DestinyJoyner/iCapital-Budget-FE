import React from "react";
import { useCategoryProvider } from "../../providers/CategoryProvider.jsx";
import { v4 as uuidv4 } from "uuid";
import { categoryIcons } from "../../utils/categoryIcons.js";
import "./TransactionCard.scss";

export default function TransactionCard({ transaction }) {
  const { categoryObj } = useCategoryProvider();
  const { category, amount, transaction_date, transaction_type } = transaction;

  return (
    <div className="transactionCard subtext-font" key={uuidv4()}>
      <span className="transactionCard_icon">
        {" "}
        {React.createElement(categoryIcons[category])}
      </span>
      <div className="transactionCard_details flex-column-center">
        <span className="transactionCard_details_category">
          {categoryObj[category]}
        </span>
        <span className="transactionCard_details_date">{transaction_date}</span>
      </div>
      <span
        className={`transactionCard_amount ${
          transaction_type === "income" ? "green" : "red"
        }`}
      >
        {transaction_type === "income" ? "+ " : "- "}${amount}
      </span>
    </div>
  );
}
