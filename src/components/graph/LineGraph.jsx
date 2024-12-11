import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useBudgetProvider } from "../../providers/BudgetProvider.jsx";

import "./LineGraph.scss";

// register components!!!!
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineGraph() {
  const { userCategoryExpenses, userBudgetSummary} = useBudgetProvider();
  // chart config
  const chartData = {
    labels: Object.keys(userCategoryExpenses || {}),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(userCategoryExpenses || {}),
        borderColor: "#0077aa",
        backgroundColor: "#ffffff",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        onClick: null,  // disable legend click 
        labels: {
          font: {
            family: "Open Sans",
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Expenses by Category",
        font: {
          size: 22,
          family: "Inter",
          color: "black",
        },
      },
      tooltip: {
        callbacks: {
          label: function (amount) {
            return `$${amount.raw.toFixed(2)}`;
          },
          titleFont: {
            family: "'Open Sans",
          },
          bodyFont: {
            family: "'Open Sans",
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount ($)",
          font: {
            family: "Inter",
          },
        },
        ticks: {
          callback: function (value) {
            return "$" + value;
          },
          font: {
            family: "Inter",
          },
          // no min, max, or step size allows for dynamic/ auto scaling
        },
      },
      x: {
        title: {
          display: true,
          text: "Expense Categories",
          font: {
            family: "Inter",
          },
        },
        ticks: {
          font: {
            family: "Inter",
          },
        },
      },
    },
  };

  /* 
     CategoryScale,    // category-based X-axis (categories)
    LinearScale,      // numeric Y-axis (amounts)
    PointElement,     // data points on the line
    LineElement,      // lines between points
    Title,           // chart titles
    Tooltip,         // hover tooltips ??
    Legend           // chart legend for categories
   */
useEffect(() => {},[userBudgetSummary])
  return (
    <div className="line_graph app-card">
      <Line data={chartData} options={options} />
    </div>
  );
}
