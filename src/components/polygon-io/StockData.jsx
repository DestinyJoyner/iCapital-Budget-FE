// Experimental -> keep seperate
import {useState, useEffect} from "react"
import StockChart from "./StockChart.jsx"
import {fetchStockData} from "../../utils/polygonAPI.js"

export default function StockData({ticker}) {
const [stockData, setStockData] = useState([])
/* 
"AAPL" Apple
"MSFT" Microsoft
"GOOGL" Google/Alphabet
"META" Meta/Facebook
"AMZN" Amazon
"V" Visa
"MA" Mastercard
"JPM" JPMorgan Chase
"BAC" Bank of America
"WFC" Wells Fargo

*/

useEffect( () => {
    // fetchStockData(ticker) ->week?
    
    const getData = async () => {
        const fetchData = await fetchStockData(ticker)
        // console.log(fetchData)
        setStockData(fetchData.results)
    }
    // getData()
},[ticker])

useEffect(() => {},[stockData])

    return (
     
            stockData &&<StockChart stockData={stockData} ticker = {ticker} />
         
    )
}