import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

export default function StockChart({stockData, ticker}) {

    const prepareChartData = (stockData) => {
        return {
            labels: stockData.map(entry => new Date(entry.t).toLocaleDateString()), // Convert timestamps to dates
            datasets: [
                {
                    label: 'Close Price',
                    data: stockData.map(entry => entry.c), // close prices
                    borderColor: "#AA3300",
                    backgroundColor: "rgba(170, 51, 0, 0.2)",
                    fill: false,
                },
                {
                    label: 'Volume',
                    data: stockData.map(entry => entry.v), // volume
                    borderColor: "#00AA88",
                    backgroundColor: "rgba(0, 170, 136, 0.2)",
                    fill: false,
                    yAxisID: 'y-axis-volume',
                }
            ]
        };
    };

    // chart options:
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                      family: "Open Sans",
                      size: 14,
                    },
                  }
            },
            title: {
                display: true,
                text: `Weekly Stock Data for ${ticker}`,
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
                  }
            }
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
                min: Math.min(...stockData.map(entry => entry.c)) * 0.95, // Set min to 95% of the lowest close price
                max: Math.max(...stockData.map(entry => entry.c)) * 1.05, // Set m
            },
            'y-axis-volume': {
                type: 'linear',
                position: 'right',
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
                min: Math.min(...stockData.map(entry => entry.v)) * 0.95,
                max: Math.max(...stockData.map(entry => entry.v)) * 1.05,
            },
        },
    };

    const chartData = prepareChartData(stockData);


    return (
        <div className = " stockData line_graph app-card" >
            <Line data={chartData} options={options} />
        </div>
        
    )
}