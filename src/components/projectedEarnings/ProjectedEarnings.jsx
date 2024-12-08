import { useState, useEffect } from "react";
import { useStockAPIProvider } from "../../providers/StockAPIProvider.jsx";
import { useBudgetProvider } from "../../providers/BudgetProvider.jsx";
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
  const { userSavings } = useBudgetProvider();

  const savingsPercentAdviceObj = {
    conservative: "conservative",
    moderate: "moderate",
    aggressive: "aggressive",
    disclaimer: "make sure you have emergency fund",
  };
  const [savingsPercentage, setSavingsPercentage] = useState(".15");
  const [savingsPercentAdvice, setSavingsPercentAdvice] = useState(
    savingsPercentAdviceObj.conservative
  );

  const [projectedEarnings, setProjectedEarnings] = useState();
  const [stockPERatio, setStockPERatio] = useState();

  //   if savings investment < cost of share, inform user b/c returns will 0 as they cant afford a share, so show share price and amount investing at each percentage!!!!!!
  const [sharePrice, setSharePrice] = useState(239.59);
  const [amountInvesting, setAmountInvesting] = useState();
//   iff user cant afford share
  const [savingsNeededInvest, setSavingsNeededToInvest] = useState(null)
//   if user can afford shares
const [numberOfShares, setNumberOfShares] = useState(0)
  const [affordShare, setAffordShare] = useState(false);

  function calculatePERatio() {
    // max api calls so temp default value
    const lastYearEps = 9.25;
    // const lastYearEps = earningsPerShare.annualEarnings[0].reportedEPS;
    // const lastClosingPrice =
    //   tickerClosingPrice.results[tickerClosingPrice.results.length - 1].c;
    const lastClosingPrice = 25.27;

    // console.log(lastClosingPrice / lastYearEps)
    return lastClosingPrice / lastYearEps;
  }

  function returnsBasedOnSavingsPercentage(percentage) {
    const investmentAmount = userSavings * +percentage;
    setAmountInvesting(investmentAmount);
    // const lastClosingPrice =
    //   tickerClosingPrice.results[tickerClosingPrice.results.length - 1].c

    const lastClosingPrice = 25.27;
    // 239.59
    setSharePrice(lastClosingPrice)
    const lastYearEps = 9.25;
    //   const lastYearEps = earningsPerShare.annualEarnings[0].reportedEPS;

    // check if user can afford a share -> if cant calculate how much more savings they need....
    if(investmentAmount < lastClosingPrice){
        setAffordShare(false)
        // const savingsNeeded = lastClosingPrice - investmentAmount
        // amount in savings * percentage needs to eaqual sharePrice in order for user to afford it
        const totalSavingsNeeded = lastClosingPrice / +percentage
        setSavingsNeededToInvest(totalSavingsNeeded.toFixed(2))
        return

    }
    else {
        setAffordShare(true)
         // how many shares?
    const amountOfShares = Math.floor(investmentAmount / lastClosingPrice);
    setNumberOfShares(amountOfShares)

    const projectedEarnings = amountOfShares * lastYearEps;

    return projectedEarnings;
    }

   
  }

  function handleSavingsRadioButtons(e) {
    const value = e.target.value;
    const id = e.target.id;
    setSavingsPercentage(value);
    setSavingsPercentAdvice(savingsPercentAdviceObj[id]);
    const PERatio = calculatePERatio();
    setStockPERatio(PERatio);
    const userReturns = returnsBasedOnSavingsPercentage(savingsPercentage);
    setProjectedEarnings(userReturns);
    // if (amountInvesting < sharePrice) {
    //   setAffordShare(false);
    // } else {
    //   setAffordShare(true);
    // }
  }

  useEffect(() => {
    // calculate ticker p/e ratio
    const PERatio = calculatePERatio();
    setStockPERatio(PERatio);
    // calculate projected returns
    const userReturns = returnsBasedOnSavingsPercentage(savingsPercentage);
    setProjectedEarnings(userReturns);
  }, []);

  return (
    <div className="projectedEarnings app-card">
      {/* HEADER */}
      <section className="projectedEarnings_header">
        <h2>Savings : ${userSavings}</h2>
        <div className="projectedEarnings_ticker_selection">
          <select value={ticker} onChange={(e) => setTicker(e.target.value)}>
            {stockTickers.map(({ ticker, name }) => (
              <option key={uuidv4()} value={ticker}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* SHARE PRICE AND AMOUNT USER INVESTING */}
      <section className="projectedEarnings_amounts">
        <p>
          <span>Share Price : {sharePrice}</span>
          <span>Amount Investing; {amountInvesting}</span>
          <span>
            {!affordShare
              ? `You cannot afford to purchase this stock with your current savings. You need $${savingsNeededInvest}  in total savings to invest ${savingsPercentage * 100}% in one share of this stock`
              : `You can buy ${numberOfShares} shares with potential annual earnings of ${projectedEarnings} and ${(projectedEarnings/12).toFixed(2)} monthly`}
          </span>
        </p>
        <span>{savingsPercentAdvice}</span>
      </section>

      {/* RADIO BUTTONS */}

      <section className="projectedEarnings_savings_percentage">
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
        </label>
      </section>
    </div>
  );
}
