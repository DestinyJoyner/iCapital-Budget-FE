import { useContext, createContext, useState, useEffect } from "react";
import { useAuthProvider } from "./AuthProvider.jsx";
import CategoryProvider from "./CategoryProvider.jsx";

export const BudgetData = createContext();
export function useBudgetProvider() {
  return useContext(BudgetData);
}

export default function BudgetProvider({ children }) {
  const { API, axios, userAuth } = useAuthProvider();

  const [userTransactions, setUserTransactions] = useState([]);
  const [userBudgetSummary, setUserBudgetSummary] = useState({});

  const [userCategoryExpenses, setUserCategoryExpenses] = useState({});

  useEffect(() => {
    // depends on token value change to retrieve user budget
    if (userAuth.authToken) {
      axios
        .get(`${API}/auth/budget`)
        .then(({ data }) => {
          const { budget_summary, transactions, category_totals } = data;
          // {budget_summary: {…}, transactions: Array(0)}
          setUserBudgetSummary(budget_summary);
          setUserTransactions(transactions);
          //   grouped categories added for line graph
          setUserCategoryExpenses(category_totals);
        })
        .catch((err) => console.log("buget provider error", err));
    }
  }, [userAuth.authToken]);

  return (
    <BudgetData.Provider
      value={{
        userTransactions,
        setUserTransactions,
        userBudgetSummary,
        setUserBudgetSummary,
        userCategoryExpenses,
        setUserCategoryExpenses
      }}
    >
      <CategoryProvider>{children}</CategoryProvider>
    </BudgetData.Provider>
  );
}
