import { useState } from "react";
import { useAuthProvider } from "../../providers/AuthProvider.jsx";
import Loading from "../loading/Loading.jsx";
import { transactionCategories } from "../../utils/transactionCategories.js";
import { handleFormTextInput } from "../../utils/authFormFunctions.js";
import { v4 as uuidv4 } from "uuid";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import "./AddTransaction.scss";

export default function AddTransaction({
  setUserTransactions,
  setUserBudgetSummary,
  setUserCategoryExpenses,
}) {
  const { API, axios } = useAuthProvider();
  const { income, expense } = transactionCategories;
  const todaysDate = new Date().toISOString().split("T")[0];
  const [transactionForm, setTransactionForm] = useState({
    amount: "",
    category: "",
    transaction_type: "expense",
    transaction_date: todaysDate,
  });
  const [categories, setCategories] = useState(expense);
  const [loading, setLoading] = useState(false);
  //   addTransaction error state
  const [transactionMessage, setTransactionMessage] = useState(false);

  // handle radio button transaction type
  function handleRadioButtons(e) {
    const value = e.target.value;
    setCategories(transactionCategories[value]);
    setTransactionForm({ ...transactionForm, transaction_type: value });
  }

  //   handle categories dropdown
  function handleDropdown(e) {
    const value = e.target.value;
    const id = e.target.id;
    setTransactionForm({ ...transactionForm, [id]: value });
  }

  //  handle addTransaction Submit
  function handleAddTransaction(e) {
    e.preventDefault();
    setLoading(true);
    setTransactionMessage(false);
    const authToken = localStorage.getItem("token");
    // axios.post(url, data, config)
    axios
      .post(`${API}/auth/budget`, transactionForm, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(({ data }) => {
        setUserTransactions(data["updated_transactions"]);
        setUserBudgetSummary(data["budget_summary"]);
        setUserCategoryExpenses(data["category_totals"]);

        // clear form since on same page
        setTransactionForm({
          amount: "",
          category: "",
          description: "",
          transaction_type: "expense",
          transaction_date: todaysDate,
        });

        // loading stage for updating transactions
        setTimeout(() => {
          setLoading(false);
          setTransactionMessage(true);
        }, 500);
      })
      .catch((err) => {
        if (err.response) {
          setTransactionMessage("Failed to add transaction.");
        }
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="add_transaction app-card flex-column ">
      <h2>Add a transaction</h2>

      <form
        className="add_transaction_form"
        onSubmit={(e) => handleAddTransaction(e)}
      >
        {/* AMOUNT */}
        <label className="add_transaction_form_label flex-column">
          <span>Amount: </span>
          <input
            type="number"
            id="amount"
            value={transactionForm["amount"]}
            min="0"
            step="0.01"
            placeholder="$0.00"
            onChange={(e) =>
              handleFormTextInput(e, transactionForm, setTransactionForm)
            }
            required
          />
        </label>

        {/* RADIO BUTTONS TRANSACTION TYPE */}
        <label className="add_transaction_form_label flex-column">
          <span>Transaction Type: </span>
          <div className="add_transaction_form_radioButtons">
            <label>
              <input
                type="radio"
                name="transaction_type"
                value="expense"
                checked={transactionForm["transaction_type"] === "expense"}
                onChange={(event) => handleRadioButtons(event)}
                required
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

        {/* CATEGORY DROPDOWN */}
        <label className="add_transaction_form_label flex-column">
          <span>Category: </span>
          <select
            id="category"
            value={transactionForm["category"]}
            onChange={(event) => handleDropdown(event)}
            // required
          >
            <option value="">Select Category</option>
            {categories.map(({ id, category_name }) => (
              <option key={uuidv4()} value={id}>
                {category_name}
              </option>
            ))}
          </select>
        </label>

        {/* DATE */}
        <label className="add_transaction_form_label flex-column">
          <span>Transaction Date: </span>
          <input
            type="date"
            id="transaction_date"
            value={transactionForm["transaction_date"]}
            onChange={(e) =>
              handleFormTextInput(e, transactionForm, setTransactionForm)
            }
          />
        </label>

        {loading ? (
          <Loading />
        ) : (
          <div className="add_transaction_form_submitButton flex-column-center">
            <input type="submit" value="Add Transaction" disabled={loading} />{" "}
            {transactionMessage === true ? (
              <FaCheckCircle color={"green"} />
            ) : typeof transactionMessage === "string" ? (
              <span className="add_transaction_form_submitButton_failed subtext-font">
                <FaTimesCircle color={"red"} />
                {transactionMessage}
              </span>
            ) : null}
          </div>
        )}
      </form>

    </div>
  );
}
