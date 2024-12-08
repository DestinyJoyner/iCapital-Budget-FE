import axios from "axios"
const VITE_ALPHA_VANTAGE_API_KEY= import.meta.env.VITE_ALPHA_VANTAGE_API_KEY

/* 
-(no eps data returned from free teir of polygon -io)
    APLHAVANTAGE API -> 25 req. per day -> look for alt for eps!!!!
        -Has endpoint for Earnings per share -> Earnings
This API returns the annual and quarterly earnings (EPS) for the company of interest. Quarterly data also includes analyst estimates and surprise metrics.
-> first obj in array shows past years reported EPS -> {
"fiscalDateEnding": "2024-09-30",
"reportedEPS": "6.41"
}
    - use current stock price and divide by eps (simple projected calculation)
        - curent stock price get last days(length -1) closing price "c" from polygon io stock data for week

        https://www.alphavantage.co/documentation/ -> earnings header
            - returns the annual and quarterly earnings (EPS) for the company of interest. Quarterly data also includes analyst estimates and surprise metrics.
            function=EARNINGS
            symbol= <ticker>:
            https://www.alphavantage.co/query?function=EARNINGS&symbol=IBM&apikey=<api-key>
            shape:

"symbol": "IBM",
"annualEarnings": [
{
"fiscalDateEnding": "2024-09-30", <- this is first object for eps
"reportedEPS": "6.41"
},

    - ?????? use the basic p/e ratio and somehow factor in the users disposable income or savings and the price per share and what they may be able to earn if they choose to invest in the stock and also analyze whether it will be a high or low risk if they did.......
        https://www.investopedia.com/investing/use-pe-ratio-and-peg-to-tell-stocks-future/

        - take eps and compare that to the cost of buying a single share
            - factoring in the user's available funds; a high P/E ratio generally indicates a higher risk of overvaluation
            - a low P/E could suggest a potentially undervalued stock
            - high p/e  around 20-25, ->  P/E ratio of 25, which is above the S&P average, trades at 25 times its earnings
            -low  - lower than high ^^ 
            - base projected earnings on SAVINGS (show varying returns based on percentage of savings invested? -> is to keep 30-40% in savings and invest the rest
            - conservative < 15%, moderate < 30%, aggresive high 50-60%) not disposable income: already accumulated money

      discalimer -> if have emergency fund set up!!
https://www.sarwa.co/blog/how-much-percentage-of-savings-should-you-invest
*/

async function fetchTickerEPS (ticker) {
    const url = `https://www.alphavantage.co/query?function=EARNINGS&symbol=${ticker}&apikey=${VITE_ALPHA_VANTAGE_API_KEY}`

    const resp = await axios.get(url).then(({data}) => data).catch(err => {console.log("alpha vantage fetch err", err)
        return null
    })
return resp
}

export {
    // fetchTickerEPS
}