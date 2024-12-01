import {useState} from "react"
import {useAuthProvider} from "../../providers/AuthProvider.jsx"
import "./AddTransaction.scss"

export default function AddTransaction () {
    const {API, axios} = useAuthProvider()
    const [transactionForm, setTransactionForm] = useState({
        amount: 0,
        category: "",
        transaction_type: "expense"
    })

    // handle radio buttons
    function handleRadioButtons (e) {
        const value = e.target.value
        setTransactionForm({...transactionForm, transaction_type:value})
    }

    return (
        <div className="transaction">
            <h2>Add a transaction</h2>

            <form className="transaction_form">
                <label>
                    <span>Amount</span>
                    <input type="number"
                    min="0"
                    step="0.01"
                    placeholder="$0.00"
                    required />
                </label>

        <label>
            <span>Category:</span>
        </label>

        <label>
            <span>Transaction Type</span>
            <div className="transaction_form_radioButtons">
                <label>
                <input type="radio" 
            name="transaction_type"
            value="expense"
            checked={transactionForm["transaction_type"] === "expense"}
            onChange={(event) => handleRadioButtons(event)}/>
            <span>Expense</span>
                </label>
           

<label>
<input type="radio" 
            name="transaction_type"
            value="income"
            checked={transactionForm["transaction_type"] === "income"}
            onChange={(event) => handleRadioButtons(event)}/>
            <span>Income</span>
</label>
            </div>
           

        </label>
            </form>
        </div>
    )
}