import { useState, useEffect } from "react";
import { useStockAPIProvider } from "../../providers/StockAPIProvider.jsx";
import {useBudgetProvider} from "../../providers/BudgetProvider.jsx"
import { stockTickers } from "../../utils/stockTickers.js";
import { v4 as uuidv4 } from "uuid";
import "./ProjectedEarnings.scss";

export default function ProjectedEarnings() {
  const {
    earningsPerShare,
    setEarningsPerShare,
    tickerClosingPrice,
    setTickerClosingPrice,
    ticker,
    setTicker,
  } = useStockAPIProvider();
  const {userSavings} = useBudgetProvider()

  const savingsPercentAdviceObj = {
    conservative:"",
    moderate: "",
    aggressive: "",
    disclaimer: ""
  }
  const [savingsPercentage, setSavingsPercentage] = useState(".15")
  const [savingsPercentAdvice, setSavingsPercentAdvice] = useState(savingsPercentAdviceObj.conservative) 

  function calculatePERatio() {
    const lastYearEps = earningsPerShare.annualEarnings[0].reportedEPS;
    const lastClosingPrice =
      tickerClosingPrice.results[tickerClosingPrice.results.length - 1].c;

    // console.log(lastClosingPrice / lastYearEps)
    return lastClosingPrice / lastYearEps;
  }

  function returnsBasedOnSavingsPercentage (percentage) {
    const investmentAmount = userSavings * percentage
    const lastClosingPrice =
      tickerClosingPrice.results[tickerClosingPrice.results.length - 1].c 
      const lastYearEps = earningsPerShare.annualEarnings[0].reportedEPS;
    // how many shares?
    const amountOfShares = Math.floor(investmentAmount / lastClosingPrice)

    const projectedEarnings = amountOfShares * lastYearEps

    return projectedEarnings

  }

  function handleSavingsRadioButtons (e) {
    const value = e.target.value
    const id = e.target.id
    setSavingsPercentage(value)
    setSavingsPercentAdvice(savingsPercentAdviceObj[id])

  }

  return (
    <div className="projectedEarnings app-card">
        <h2>Savings : ${userSavings}</h2>
      <section className="projectedEarnings_ticker_selection">
        <select value={ticker} onChange={(e) => setTicker(e.target.value)}>
          {stockTickers.map(({ ticker, name }) => (
            <option key={uuidv4()} value={ticker}>
              {name}
            </option>
          ))}
        </select>
      </section>

      <section className="projectedEarnings_savings_percentage">
        {/* radioButtons */}
        <label>
          <span>Savings Percentage to Invest</span>
          <div className="projectedEarnings_savings_percentage_radioButtons">
            {/* Conservative */}
            <label>
              <input 
              type="radio" 
              name="savings_percentage" 
              value=".15" 
              id="conservative"
              onChange={(event) => handleSavingsRadioButtons(event)}
              checked={savingsPercentage === ".15"}
                />
              <span>Conservative 15%</span>
            </label>
            {/* moderate */}
            <label>
              <input type="radio" name="savings_percentage" value=".30" id="moderate" onChange={(event) => handleSavingsRadioButtons(event)}
              checked={savingsPercentage === ".30"}/>
              <span>Moderate 30%</span>
            </label>
            {/* aggressive */}
            <label>
              <input type="radio" name="savings_percentage" value=".50" id="aggressive" onChange={(event) => handleSavingsRadioButtons(event)}
              checked={savingsPercentage === ".50"} />
              <span>Aggresive 50%</span>
            </label>
          </div>
        </label>
      </section>
    </div>
  );
}
