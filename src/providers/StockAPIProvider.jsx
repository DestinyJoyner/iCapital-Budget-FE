import { useContext, createContext, useState, useEffect } from "react";
// import {fetchTickerEPS} from "../utils/alphaVantageAPI.js"
import {FMPFetchStockData} from "../utils/financialModelingPrepAPI.js"
// import {fetchStockData} from "../utils/polygonAPI.js"

export const StockAPIData = createContext();
export function useStockAPIProvider() {
  return useContext(StockAPIData);
}

export default function StockAPIProvider ({children}){
const [earningsPerShare, setEarningsPerShare ] = useState(null)
const [tickerClosingPrice, setTickerClosingPrice] = useState(null)
const [ticker, setTicker] = useState("AAPL")


useEffect(() => {
  async function getStockData () {
   const stockData = await FMPFetchStockData(ticker)

    setEarningsPerShare(stockData["earnings_per_share"])
    setTickerClosingPrice(stockData["current_price"])
    // setTicker(closingPrice.ticker)
  }
  getStockData()
}, [ticker])
  return (
    <StockAPIData.Provider value={{
      earningsPerShare,
      setEarningsPerShare,
      tickerClosingPrice,
      setTickerClosingPrice,
      ticker, setTicker
    }}>
      {children}
    </StockAPIData.Provider>
  )
}