import React from "react";
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
import { stockTickers } from "../../utils/stockTickers.js";

// register chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockChart({ stockData, ticker, setTicker }) {
  const tickerName = stockTickers.find((el) => el.ticker === ticker);
/* 
amount per stock, volume -> the total number of shares traded (bought and sold) during a specific time period

Higher volume = More trading activity
Lower volume = Less trading activity

High volume + Price increase = Strong upward trend
High volume + Price decrease = Strong downward trend
Low volume + Price change = Potentially weak or unsustainable movement
*/

  const prepareChartData = (stockData) => {
    return {
      labels: stockData.map((entry) => new Date(entry.t).toLocaleDateString()), // Convert timestamps to dates
      datasets: [
        {
          label: "Close Price",
          data: stockData.map((entry) => entry.c), // close prices
          borderColor: "#AA3300",
          backgroundColor: "rgba(170, 51, 0, 0.2)",
          fill: false,
        },
        {
          label: "Volume",
          data: stockData.map((entry) => entry.v), // volume
          borderColor: "#00AA88",
          backgroundColor: "rgba(0, 170, 136, 0.2)",
          fill: false,
          yAxisID: "y-axis-volume",
        },
      ],
    };
  };

  // chart options:
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Open Sans",
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `Weekly Stock Data for ${tickerName.name}`,
        font: {
          size: 22,
          family: "Inter",
          color: "black",
        },
      },
      tooltip: {
        titleFont: {
          family: "'Open Sans",
        },
        bodyFont: {
          family: "'Open Sans",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            family: "Inter",
          },
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Amount ($)",
          font: {
            family: "Inter",
          },
        },
        // how to extend y axis' to height of container -> disable start at zero and turn off maintain aspect ration, set min/max values to percentage below and above max volumes
        min: Math.min(...stockData.map((entry) => entry.c)) * 0.95, // Set min to 95% of the lowest close price
        max: Math.max(...stockData.map((entry) => entry.c)) * 1.05, // Set m
      },
      "y-axis-volume": {
        type: "linear",
        position: "right",
        beginAtZero: false,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Volume",
          font: {
            family: "Inter",
          },
        },
        min: Math.min(...stockData.map((entry) => entry.v)) * 0.95,
        max: Math.max(...stockData.map((entry) => entry.v)) * 1.05,
      },
    },
  };

  const chartData = prepareChartData(stockData);

  return (
    <div className="stockData line_graph app-card">
      <select onChange={(e) => setTicker(e.target.value)}>
        {stockTickers.map(({ ticker, name }) => (
          <option value={ticker}>{name}</option>
        ))}
      </select>
      <Line data={chartData} options={options} />
    </div>
  );
}
