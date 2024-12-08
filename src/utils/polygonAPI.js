// Experimental -> keep seperate
import axios from "axios"

const POLYGON_API_KEY = import.meta.env.VITE_POLYGON_API_KEY;

// tickers -> https://polygon.io/quote/tickers?type=CS&cursor=
/* 
Daily:
A good starting point for most traders, showing price movements over a single day, helping to identify support and resistance levels. 
Weekly:
Useful for identifying medium-term trends and patterns by looking at price changes over a week.
*/
// fetch function for polygon historical stocks data yyyy-mm-dd

// get weekly last 7 days:
// NOT : startDate = endDate.getDate() - 7 -> attempt to assign an integer to startDate, which is supposed to be a Date object.
// use the setDate() method on a Date object, which modifies the day of the month while keeping the rest of the date intact
// This returns an integer representing the day of the month 
const endWeek = new Date();  
const startWeek= new Date(); 
startWeek.setDate(endWeek.getDate() - 7);
// Format dates as YYYY-MM-DD for API
const startDate = startWeek.toISOString().split('T')[0];
const endDate = endWeek.toISOString().split('T')[0];

async function fetchStockData(ticker) {
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}?apiKey=${POLYGON_API_KEY}`;
    // console.log(url)
    // https://api.polygon.io/v2/aggs/ticker/GOOGL/range/1/day/2024-11-28/2024-12-05?apiKey=
   const resp = await axios.get(url, {
    headers: {
        'Authorization': `Bearer ${POLYGON_API_KEY}`
    }
}).then(({data}) => data).catch(err => {
    console.log("polygon fetch error", err)
    return null})

    return resp
}
export {
    fetchStockData
}

/* 
SHAPE:
{
"ticker": "AAPL",
"queryCount": 1,
"resultsCount": 1,
"adjusted": true,
"results": [
{
"v": 70790813,
"vw": 131.6292,
"o": 130.465,
"c": 130.15,
"h": 133.41,
"l": 129.89,
"t": 1673240400000,
"n": 645365
}
],
"status": "OK",
"request_id": "bb9ce6d0e98ea04528c6ec73f11ea31b",
"count": 1

KEYS:
c*number
The close price for the symbol in the given time period.

h*number
The highest price for the symbol in the given time period.

l*number
The lowest price for the symbol in the given time period.

ninteger
The number of transactions in the aggregate window.

o*number
The open price for the symbol in the given time period.

otcboolean
Whether or not this aggregate is for an OTC ticker. This field will be left off if false.

t*integer
The Unix Msec timestamp for the start of the aggregate window.

v*number
The trading volume of the symbol in the given time period.

vwnumber
The volume weighted average price.
}
*/