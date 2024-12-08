// same data retrieved from alpha, 250 calls / day -> https://site.financialmodelingprep.com/developer/docs/pricing

// https://site.financialmodelingprep.com/developer/docs/dashboard

// https://financialmodelingprep.com/api/v3/income-statement/aapl?apikey= <-this enpoint-> resp[0].eps
// https://financialmodelingprep.com/api/v3/quote/AAPL?apikey= <- this endpoint [0].previosClose or .price(current) -> no need for polygon !!!
/* 
keys from return :
cashPerShare?
netIncomePerEBT?
returnOnEquity?
returnOnAssets?
netProfitMargin?
cashRatio?
priceSalesRatio?
priceEarningsRatio?
dividenendPayoutRatio?
*/

import axios from "axios"

const VITE_FMP_API_KEY = import.meta.env.VITE_FMP_API_KEY

async function FMPFetchStockData (ticker) {
    const espURL = `https://financialmodelingprep.com/api/v3/income-statement/${ticker}?apikey=${VITE_FMP_API_KEY}`
    const currentPriceURL = `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${VITE_FMP_API_KEY}`
    
    const espResponse = await axios.get(espURL).then(({data}) => data[0].eps).catch(err => {
        console.log("fmp esp fetch error", err)
        return null
    })

    const priceResp = await axios.get(currentPriceURL).then(({data}) => data[0].price).catch(err => {
        console.log("fmp price fetch error", err)
        return null
    })
    return {
        ticker: ticker,
        earnings_per_share: espResponse,
        current_price: priceResp
    }

}

export {
    FMPFetchStockData
}