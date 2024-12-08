import { useContext, createContext, useState, useEffect } from "react";
import {fetchTickerEPS} from "../utils/alphaVantageAPI.js"
import {fetchStockData} from "../utils/polygonAPI.js"

export const StockAPIData = createContext();
export function useStockAPIProvider() {
  return useContext(StockAPIData);
}

export default function StockAPIProvider ({children}){
const [earningsPerShare, setEarningsPerShare ] = useState({})
const [tickerClosingPrice, setTickerClosingPrice] = useState({})
const [ticker, setTicker] = useState("AAPL")


useEffect(() => {
  async function getStockData () {
    const closingPrice = await fetchStockData(ticker)
    const eps = await fetchTickerEPS(ticker)

    setEarningsPerShare(eps)
    setTickerClosingPrice(closingPrice)
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