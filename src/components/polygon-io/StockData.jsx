// Experimental -> keep seperate
import { useState, useEffect } from "react";
import StockChart from "./StockChart.jsx";
import { fetchStockData } from "../../utils/polygonAPI.js";
import "./StockData.scss";

export default function StockData({ ticker, setTicker }) {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // fetchStockData(ticker) ->week?

    const getData = async () => {
      const fetchData = await fetchStockData(ticker);
      // console.log(fetchData)
      setStockData(fetchData.results);
    };
    getData();
  }, [ticker]);

  useEffect(() => {}, [stockData]);

  return (
    stockData && (
      <StockChart stockData={stockData} ticker={ticker} setTicker={setTicker} />
    )
  );
}
