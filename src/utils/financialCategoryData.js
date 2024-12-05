// 50,30/20 groups from app categories
const incomeGroups = {
    needs: ["rent/mortgage", "utilities", "groceries", "transportation", "healthcare", "insurance", "phone/internet"],
    wants: ["personal care", "clothing", "dining out", "entertainment", "shopping", "hobbies", "streaming services", "travel", "gifts"],
    savings: ["savings", "investments", "debt payment", "education"]
}

// recommended/ risk/ low/ high thresholds for each income category
const thresholds = {
    needs: { recommended: 50, warning: 55, high: 60 },
    wants: { recommended: 30, warning: 35, high: 40 },
    savings: { recommended: 20, warning: 15, low: 10 }
}
/* 
categories grouped from api (expenses only) grab total income from budgetSummary.total_income -> 
{
Clothing:189.25
Groceries:264.87
Rent/Mortgage:945
}
*/
// check each caegory for what 50/30/220 group it falls in and calculate totals fpr 50/30/20 obj
function calculateIncomeGroupTotals () {
    
}