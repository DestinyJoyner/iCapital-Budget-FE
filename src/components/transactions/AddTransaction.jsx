import { useState } from "react";
import { useAuthProvider } from "../../providers/AuthProvider.jsx";
import {transactionCategories} from "../../utils/transactionCategories.js"
import {handleFormTextInput} from "../../utils/authFormFunctions.js"
import { v4 as uuidv4 } from 'uuid';
import "./AddTransaction.scss";

export default function AddTransaction() {
  const { API, axios } = useAuthProvider();
  const {income, expense} = transactionCategories
  const todaysDate = new Date().toISOString().split("T")[0]
  const [transactionForm, setTransactionForm] = useState({
    amount: "",
    category: "",
    transaction_type: "expense",
    transaction_date: todaysDate
  });
  const [categories, setCategories] = useState(expense)

  // handle radio button transaction type
  function handleRadioButtons(e) {
    const value = e.target.value;
    setCategories(transactionCategories[value])
    setTransactionForm({ ...transactionForm, transaction_type: value });
  }

//   handle categories dropdown
 function handleDropdown (e) {
    const value = e.target.value
    const id = e.target.id
    setTransactionForm({...transactionForm, [id]:value})
 }

  return (
    <div className="transaction">
      <h2>Add a transaction</h2>

      <form className="transaction_form">
        {/* AMOUNT */}
        <label>
          <span>Amount: {" "}</span>
          <input
            type="number"
            id="amount"
            value={transactionForm["amount"]}
            min="0"
            step="0.01"
            placeholder="$0.00"
            onChange={(e) => handleFormTextInput (e, transactionForm, setTransactionForm) }
            required
          />
        </label>

{/* CATEGORY DROPDOWN */}
        <label>
          <span>Category: {" "}</span>
          <select
          id ="category"
          value={transactionForm["category"]}
          onChange={(event) => handleDropdown(event)}
          >
            <option value="">Select Category</option>
            {
            categories.map(category => 
            <option
            key={uuidv4()} 
            value={category}>{category}</option>)
        }
          </select>

        </label>

{/* RADIO BUTTONS TRANSACTION TYPE */}
        <label>
          <span>Transaction Type: {" "}</span>
          <div className="transaction_form_radioButtons">
            <label>
              <input
                type="radio"
                name="transaction_type"
                value="expense"
                checked={transactionForm["transaction_type"] === "expense"}
                onChange={(event) => handleRadioButtons(event)}
              />
              <span>Expense</span>
            </label>

            <label>
              <input
                type="radio"
                name="transaction_type"
                value="income"
                checked={transactionForm["transaction_type"] === "income"}
                onChange={(event) => handleRadioButtons(event)}
              />
              <span>Income</span>
            </label>
          </div>
        </label>

        {/* DATE */}
        <label>
            <span>Transaction Date: {" "}</span>
            <input type="date"
            id="transaction_date"
            value={transactionForm["transaction_date"]}
            onChange={(e) => handleFormTextInput (e, transactionForm, setTransactionForm) } />
        </label>
      </form>
    </div>
  );
}
