import { useContext, createContext, useState, useEffect } from "react";
import {useAuthProvider} from "./AuthProvider.jsx"

export const BudgetData = createContext();
export function useBudgetProvider() {
  return useContext(BudgetData);
}

export default function BudgetProvider ({children}) {
    const{API, axios, userAuth} = useAuthProvider()

    const [userTransactions, setUserTransactions] = useState([])
    const[userBudgetSummary, setUserBudgetSummary] = useState({})

    useEffect(() => {
        // depends on token value change to retrieve user budget
        axios.get(`${API}/auth/budget`).then(({data}) => {
            console.log(data, "budget")
        }).catch(err => console.log("buget provider error", err))

    },[])

    return (
        <BudgetData.Provider value={{}}>
            {children}
        </BudgetData.Provider>
    )
}