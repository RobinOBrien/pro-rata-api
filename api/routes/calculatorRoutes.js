"use strict";
const calculator = require('../services/calculatorService')
const {BadRequestError} = require('../utils/errors')
const AllocationRequest = require('../models/AllocationRequest')

exports.configure = (app) => {
    app.post('/calculator', handleCalculateAllocation)
}

const handleCalculateAllocation = (req, res) => {
    const {allocation_amount, investor_amounts} = req.body

    validateIncomingRequest(allocation_amount, investor_amounts)

    let investorAllocations = calculator.calculateAllocation(new AllocationRequest(allocation_amount, investor_amounts))

    res.status(200).json(calculator.formatResultsForDisplay(investorAllocations))
}

/**
 * Validates incoming request to ensure there are no missing mandatory fields
 * @param allocation_amount
 * @param investor_amounts
 */
function validateIncomingRequest(allocation_amount, investor_amounts) {
    if (!allocation_amount) {
        throw new BadRequestError("Missing required field: allocation_amount")
    }

    if (!investor_amounts || investor_amounts.length === 0) {
        throw new BadRequestError("Missing required field(s): investor_amounts")
    }
}

function formatResultsForDisplay(investors) {
    let result = {}
    investors.forEach(alloc => {
        result[alloc.name] = Number(alloc.actualAllocation.round(5).getValue())
    })
    return result
}