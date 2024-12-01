import {useEffect, useState} from "react"
import {useBudgetProvider} from "../../providers/BudgetProvider.jsx"
import {useAuthProvider} from "../../providers/AuthProvider.jsx"
import AddTransaction from "../transactions/AddTransaction.jsx"
import { v4 as uuidv4 } from 'uuid';
import { MdAttachMoney } from "react-icons/md";
import "./AccountDashboard.scss"

export default function AccountDashboard() {
    const {userTransactions, setUserTransactions,
        userBudgetSummary, setUserBudgetSummary} = useBudgetProvider()
        const {userAuth} = useAuthProvider()

        const {disposable_income, total_expenses, total_income} = userBudgetSummary
    return (
        <div className="dashboard">
            <section className="dashboard_header">
                <div className="dashboard_header_left">
        <h2>Welcome, {userAuth.first_name}!</h2>
                </div>
                <div className="dashboard_header_right">
                    <li>Disposable Income: ${disposable_income || 0}</li>
                   <li>Total Income: ${total_income || 0}</li>
                   <li>Total Expenses: ${total_expenses || 0}</li>
                </div>
            </section>

            {/* Transactions */}
            <section className="dashboard_addTransaction">
                <AddTransaction setUserTransactions={setUserTransactions} setUserBudgetSummary={setUserBudgetSummary} />
            </section>

            <section className="dashboard_transactions">
                {
                    userTransactions.map(({category, amount, transaction_date, transaction_type}) => 
                        <div className="dashboard_transactions_transaction"
                        key={uuidv4()}>
                            <span><MdAttachMoney /></span>
                            <div className="dashboard_transactions_transaction_details flex-column-center">
                            <span className="dashboard_transactions_transaction_details_category">{category}</span>
                                <span className="dashboard_transactions_transaction_details_date">{transaction_date}</span>
                                
                            </div>
                            <span className={`dashboard_transactions_transaction_amount ${transaction_type==="income" ? "green": "red"}`}>
                            {transaction_type==="income"? "+ " : "- "}${amount}
                            </span>
                        </div>
                    )
                }
            </section>
        </div>
    )
}

/* 
{
    "added_budget": {
        "id": 4,
        "category": "Salary",
        "amount": "1325.00",
        "transaction_date": "10/29/2024",
        "transaction_type": "income"
    },
    "budget_summary": {
        "total_income": "1325.00",
        "total_expenses": null,
        "disposable_income": "1325.00"
    },
    "updated_transactions": [
        {
            "id": 4,
            "category": "Salary",
            "amount": "1325.00",
            "transaction_date": "10/29/2024",
            "transaction_type": "income"
        }
    ]
}

*/