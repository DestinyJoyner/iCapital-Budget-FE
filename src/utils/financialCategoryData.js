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
function calculateIncomeGroupTotals (userCategoryExpenses) {
    const incomeGroupObj = {
        needs: 0,
        wants: 0,
        savings:0
    }

    // loop into userCategoryExpenses obj check if key in income group array
    const needsCategoryArr = incomeGroups.needs
    const wantsCategoryArr = incomeGroups.wants
    const savingsCategoryArr = incomeGroups.savings

    for(const key in userCategoryExpenses ){
        const lowercaseKey = key.toLowerCase()
        const amount = userCategoryExpenses[key]
        if(needsCategoryArr.includes(lowercaseKey)){
            incomeGroupObj.needs += amount
        }
        else if(wantsCategoryArr.includes(lowercaseKey)){
            incomeGroupObj.wants += amount
        }
        else if (savingsCategoryArr.includes(lowercaseKey)){
            incomeGroupObj.savings += amount
        }
    }
    return incomeGroupObj
}

// use income group objects to calculate if within or exceeds thresholds for warnings
function calculateThresholdPercentage (incomeGroupObj, total_income) {
    const percentages = {
        needs: ((incomeGroupObj.needs / total_income) * 100).toFixed(2),
        wants: ((incomeGroupObj.wants / total_income) * 100).toFixed(2),
        savings: ((incomeGroupObj.savings / total_income) * 100).toFixed(2)
    }
    return percentages
}

// compare percentages to threshold obj and set warnings if any (return)
function analyzeThresholds (percentages) {
    const {needs, wants, savings} = percentages
    
    // needs: { recommended: 50, warning: 55, high: 60 }

    const needsThreshold = needs > thresholds.needs.high ? "Your essential expenses are critically high. Try to reduce some needs or increase income." : needs > thresholds.needs.warning ? "Your essential expenses are above recommended levels." : "Your essential expenses are at a recommended level."

    const wantsThreshold = wants > thresholds.wants.high ? "Your discretionary spending is very high. Consider cutting back on non-essential expenses." : wants > thresholds.wants.warning ? "Your discretionary spending is above recommended levels." : "Your discretionary spending is at a recommended level." 

    const savingsThreshold = savings < thresholds.savings.low ? "Your savings rate is critically low. Try to increase savings for financial security." : savings < thresholds.savings.warning ? "Your savings rate is below recommended levels." : "Your savings rate is at a recommended level."

    const incomeThresholdAdviceObj = {
        needs: needsThreshold,
        wants: wantsThreshold,
        savings:savingsThreshold
    }

    return incomeThresholdAdviceObj

}

export {
    calculateIncomeGroupTotals,
    calculateThresholdPercentage,
    analyzeThresholds

}