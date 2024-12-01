import BudgetProvider  from "../providers/BudgetProvider.jsx";
import AccountDashboard from "../components/dashboard/AccountDashboard.jsx";

export default function Dashboard() {
  return (
    <BudgetProvider>
      <AccountDashboard />
    </BudgetProvider>
  );
}
