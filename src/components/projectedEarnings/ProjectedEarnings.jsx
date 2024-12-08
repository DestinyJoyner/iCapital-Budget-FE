import React, { useState, useEffect } from "react";
import { useStockAPIProvider } from "../../providers/StockAPIProvider.jsx";
import { useBudgetProvider } from "../../providers/BudgetProvider.jsx";
import { stockTickers } from "../../utils/stockTickers.js";
import { tickerIcons } from "../../utils/tickerIcons.js";
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
  const { userSavings } = useBudgetProvider();

  const savingsPercentAdviceObj = {
    conservative:
      "Conservative (15%): A safer approach that maintains substantial emergency savings while testing the market. Ideal for beginners or those prioritizing financial security.",
    moderate:
      "Moderate (30%): A balanced approach between growing investments and maintaining savings. Suitable for those with stable income and some investment experience.",
    aggressive:
      "Aggressive (50%): Higher investment allocation for potentially larger returns. Ensure you maintain 3-6 months of expenses in emergency savings before investing this amount.",
    disclaimer:
      "These calculations are predictions based on current market data and historical earnings. Actual returns may vary significantly. Consider consulting a financial advisor for personalized investment advice.",
  };
  const [savingsPercentage, setSavingsPercentage] = useState(".15");
  const [savingsPercentAdvice, setSavingsPercentAdvice] = useState(
    savingsPercentAdviceObj.conservative
  );

  const [projectedEarnings, setProjectedEarnings] = useState(0);
  const [stockPERatio, setStockPERatio] = useState(0);

  //   if savings investment < cost of share, inform user b/c returns will 0 as they cant afford a share, so show share price and amount investing at each percentage!!!!!!
  //   const [sharePrice, setSharePrice] = useState(null);
  const [amountInvesting, setAmountInvesting] = useState(0);
  //   iff user cant afford share
  const [savingsNeededInvest, setSavingsNeededToInvest] = useState(0);
  //   if user can afford shares
  const [numberOfShares, setNumberOfShares] = useState(0);
  const [affordShare, setAffordShare] = useState(false);

  function calculatePERatio() {
    return tickerClosingPrice / earningsPerShare;
  }

  function returnsBasedOnSavingsPercentage(percentage) {
    const investmentAmount = userSavings * +percentage;
    setAmountInvesting(investmentAmount);

    // check if user can afford a share -> if cant calculate how much more savings they need....
    if (investmentAmount < tickerClosingPrice) {
      setAffordShare(false);
      setNumberOfShares(0);
      // const savingsNeeded = lastClosingPrice - investmentAmount
      // amount in savings * percentage needs to eaqual sharePrice in order for user to afford it
      const totalSavingsNeeded = tickerClosingPrice / +percentage;
      setSavingsNeededToInvest(totalSavingsNeeded.toFixed(2));
      return;
    } else {
      setAffordShare(true);
      // how many shares?
      const amountOfShares = Math.floor(investmentAmount / tickerClosingPrice);

      setNumberOfShares(amountOfShares);

      const projectedEarnings = amountOfShares * earningsPerShare;

      return projectedEarnings.toFixed(2);
    }
  }

  function handleSavingsRadioButtons(e) {
    const value = e.target.value;
    const id = e.target.id;

    setSavingsPercentage(value);
    setSavingsPercentAdvice(savingsPercentAdviceObj[id]);
    const PERatio = calculatePERatio();
    setStockPERatio(PERatio);
    // pass e.target.value directly to prevent delay in updating state-> debugged
    const userReturns = returnsBasedOnSavingsPercentage(value);
    setProjectedEarnings(userReturns);
  }

  useEffect(() => {
    if (tickerClosingPrice && earningsPerShare && userSavings){
        // calculate ticker p/e ratio
    const PERatio = calculatePERatio();
    setStockPERatio(PERatio);
    // calculate projected returns
    const userReturns = returnsBasedOnSavingsPercentage(savingsPercentage);
    setProjectedEarnings(userReturns);
    }
    
  }, [tickerClosingPrice, earningsPerShare, userSavings, savingsPercentage]);

  return (
    <div className="projectedEarnings app-card">
      <h2>Investment Returns Estimator</h2>
      {/* HEADER */}
      <section className="projectedEarnings_header">
        <h3 className="projectedEarnings_header_savings">
          Total Savings : ${userSavings}
        </h3>
        <div className="projectedEarnings_header_select">
          <label className="">
            <h3>Stock Selection</h3>
            <select value={ticker} onChange={(e) => setTicker(e.target.value)}>
              {stockTickers.map(({ ticker, name }) => (
                <option key={uuidv4()} value={ticker}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          {React.createElement(tickerIcons[ticker])}
        </div>
      </section>

      <section className="projectedEarnings_shares flex-column">
        <h3>Investment Details</h3>
        <div className="projectedEarnings_shares_breakdown">
          <span className="projectedEarnings_shares_breakdown_header">
            Share Price:
          </span>
          <br />
          <span className="projectedEarnings_shares_breakdown_price">
            ${tickerClosingPrice}
          </span>
        </div>

        <div className="projectedEarnings_shares_breakdown">
          <span className="projectedEarnings_shares_breakdown_header">
            Amount Investing:
          </span>{" "}
          <br />{" "}
          <span className="projectedEarnings_shares_breakdown_price">
            ${amountInvesting}
          </span>
        </div>

        <div className="projectedEarnings_shares_breakdown">
          <span className="projectedEarnings_shares_breakdown_header">
            Possible Shares:
          </span>{" "}
          <br />{" "}
          <span className="projectedEarnings_shares_breakdown_price">
            {numberOfShares}
          </span>
        </div>
      </section>

      {/* RADIO BUTTONS */}

      <section className="projectedEarnings_savings_percentage">
        <h3>Savings Percentage to Invest</h3>
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
            <input
              type="radio"
              name="savings_percentage"
              value=".30"
              id="moderate"
              onChange={(event) => handleSavingsRadioButtons(event)}
              checked={savingsPercentage === ".30"}
            />
            <span>Moderate 30%</span>
          </label>
          {/* aggressive */}
          <label>
            <input
              type="radio"
              name="savings_percentage"
              value=".50"
              id="aggressive"
              onChange={(event) => handleSavingsRadioButtons(event)}
              checked={savingsPercentage === ".50"}
            />
            <span>Aggresive 50%</span>
          </label>
        </div>
        <span className="projectedEarnings_savings_percentage_advice">
          {savingsPercentAdvice}
        </span>
      </section>

      {/* SHARE PRICE AND AMOUNT USER INVESTING */}
      <section className="projectedEarnings_projections">
        <h3>Projected Earnings</h3>
        {!affordShare ? (
          <div className="projectedEarnings_projections_negative flex-column">
            {/* <span>You cannot afford to purchase this stock with your current savings.</span> */}
            <span className="projectedEarnings_projections_negative_header">
              <span className="projectedEarnings_shares_breakdown_header">
                Savings Required:
              </span>
              <span className="projectedEarnings_shares_breakdown_price">
                ${savingsNeededInvest}
              </span>
            </span>
          </div>
        ) : (
          <div className="projectedEarnings_projections_positive flex-column">
            <span className="projectedEarnings_projections_positive_header">
              <span className="projectedEarnings_shares_breakdown_header">
                Annual Earnings:
              </span>
              <span className="projectedEarnings_shares_breakdown_price">
                ${projectedEarnings}
              </span>
            </span>

            <span className="projectedEarnings_projections_positive_header">
              <span className="projectedEarnings_shares_breakdown_header">
                Monthly Earnings:
              </span>
              <span className="projectedEarnings_shares_breakdown_price">
                ${(projectedEarnings / 12).toFixed(2)}
              </span>
            </span>
          </div>
        )}
      </section>
      <span className="user_financial_report_subtext subtext-font">
        {savingsPercentAdviceObj.disclaimer}
      </span>
    </div>
  );
}
