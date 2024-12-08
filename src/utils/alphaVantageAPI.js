/* 
-(no eps data returned from free teir of polygon -io)
    APLHAVANTAGE API -> 
        -Has endpoint for Earnings per share -> Earnings
This API returns the annual and quarterly earnings (EPS) for the company of interest. Quarterly data also includes analyst estimates and surprise metrics.
-> first obj in array shows past years reported EPS -> {
"fiscalDateEnding": "2024-09-30",
"reportedEPS": "6.41"
}
    - use current stock price and divide by eps (simple projected calculation)
        - curent stock price get last days(length -1) closing price "c" from polygon io stock data for week
*/