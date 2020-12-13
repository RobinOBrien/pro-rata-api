"use strict";
const bigDecimal = require('js-big-decimal');
const Investor = require('./Investor')

class AllocationRequest {
    constructor(amount, investorAmounts) {
        this._amount = new bigDecimal(amount)
        this._investors = investorAmounts.map(investorAmount => new Investor(investorAmount))
    }

    get amount() {
        return this._amount
    }

    get investors() {
        return this._investors
    }

    toString() {
        return `AllocationRequest: Amount=${this.amount.getValue()}`
    }

}

module.exports = AllocationRequest