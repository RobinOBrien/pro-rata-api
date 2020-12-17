"use strict";
const bigDecimal = require('js-big-decimal');

/**
 * Entry point for the proportionate allocation for each investor
 * @param allocationRequest
 * @returns {*[]|*}
 */
const calculateAllocation = (allocationRequest) => {
    console.log("Calculating proportionate investor allocation based on historical average investment.")
    return distribute(allocationRequest.amount, allocationRequest.investors, 0)
}

/**
 * Recursively calculates the proportionate allocation for each investor in the round
 * @param amount total amount of allocation
 * @param investors array of investors
 * @param round
 * @returns {*[]|*}
 */
function distribute(amount, investors, round) {
    // BigDecimal used to properly handle large decimals
    let runningAllocation = new bigDecimal(0)

    if (investors.length === 0) {
        return []
    }

    investors = assignWeightsToEachInvestor(investors, round)

    investors.forEach(investor => {
        console.log(`Calculating allocation for ${investor.name}`)
        let currentInvestorAllocation = investor.actualAllocation

        let allowedAllocation = investor.weight.multiply(amount)
        let newAllocation = investor.actualAllocation.add(allowedAllocation)
        investor.actualAllocation = minOf(newAllocation, investor.requestedAmount)

        let allocatedThisRound = investor.actualAllocation.subtract(currentInvestorAllocation)
        runningAllocation = runningAllocation.add(allocatedThisRound)
    })

    let calculatedAllocations = investors.map(investor => investor.actualAllocation.getValue())
    console.log(`Investor allocations calculated as [${calculatedAllocations}]`)

    let unallocatedAmount = amount.subtract(runningAllocation)
    console.log(`Unallocated amount after round ${round} is ${unallocatedAmount.getValue()}`)

    let fulfilledInvestors = investors.filter(investor => investor.hasMaximumAllocation())
    let unfulfilledInvestors = investors.filter(investor => !investor.hasMaximumAllocation())

    /**
     *     If there is no more value to allocate, return. Otherwise, distribute remaining amount to
     *     investors who have not reached their requested amount
     */
    if (unallocatedAmount.round(5, 3).compareTo(new bigDecimal(0)) === 0) {
        return investors
    } else {
        return fulfilledInvestors.concat(distribute(unallocatedAmount, unfulfilledInvestors, ++round))
    }
}

/**
 * Calculates weights for each investor based off their historical average investment amount
 * weight = investor average / total historic average
 * @param investors array of Investors
 * @returns {*}
 */
function assignWeightsToEachInvestor(investors) {
    console.log(`Calculating weights`)

    let totalHistoricAverage = new bigDecimal(0)

    investors.forEach(investor => {
        totalHistoricAverage = totalHistoricAverage.add(investor.averageAmount)
    })
    investors.forEach(investor => {
        investor.weight = investor.averageAmount.divide(totalHistoricAverage)
    })

    return investors
}

/**
 * Returns the smaller of the the two given BigDecimals
 * @param bigDecimal1
 * @param bigDecimal2
 * @returns {*}
 */
function minOf(bigDecimal1, bigDecimal2) {
    return bigDecimal1.compareTo(bigDecimal2) === -1 ? bigDecimal1 : bigDecimal2;
}

/**
 * Formats investor allocation results into a simple response for display
 * @param investors
 * @returns {{}}
 */
function formatResultsForDisplay(investors) {
    let result = {}
    investors.forEach(alloc => {
        result[alloc.name] = Number(alloc.actualAllocation.round(5).getValue())
    })
    return result
}

module.exports = {
    calculateAllocation,
    formatResultsForDisplay
}