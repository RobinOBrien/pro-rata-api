const calculator = require('../services/calculatorService')
const {BadRequestError} = require('../utils/errors')

exports.configure = (app) => {
    app.post('/calculator', handleCalculateAllocation)
}

const handleCalculateAllocation = (req, res, next) => {
    const {allocation_amount, investor_amounts} = req.body

    validateIncomingRequest(allocation_amount, investor_amounts)
    calculator.calculateAllocation(allocation_amount, investor_amounts)

    res.status(200).json("Some response")
}

function validateIncomingRequest(allocation_amount, investor_amounts) {
    if (!allocation_amount) {
        throw new BadRequestError("Missing required field: allocation_amount")
    }

    if (!investor_amounts || investor_amounts.length === 0) {
        throw new BadRequestError("Missing required field(s): investor_amounts")
    }
}