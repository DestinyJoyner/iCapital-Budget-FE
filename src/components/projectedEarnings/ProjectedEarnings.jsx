import {useState, useEffect} from "react"
import {useStockAPIProvider} from "../../providers/StockAPIProvider.jsx"
import {stockTickers} from "../../utils/stockTickers.js"
import { v4 as uuidv4 } from "uuid";
import "./ProjectedEarnings.scss"

export default function ProjectedEarnings () {
    const {earningsPerShare,
        setEarningsPerShare,
        tickerClosingPrice,
        setTickerClosingPrice,
        ticker, setTicker} = useStockAPIProvider()

        function calculatePERatio () {
            const lastYearEps = earningsPerShare.annualEarnings[0].reportedEPS
            const lastClosingPrice = tickerClosingPrice.results[tickerClosingPrice.results.length -1].c

            // console.log(lastClosingPrice / lastYearEps)
            return lastClosingPrice / lastYearEps
        }
        // calculatePERatio()
    return (
        <div className="projectedEarnings">
            <select value = {ticker}
            onChange={(e) => setTicker(e.target.value)}>
        {stockTickers.map(({ ticker, name }) => (
          <option key={uuidv4()} value={ticker}>{name}</option>
        ))}
      </select>
        </div>
    )
}

