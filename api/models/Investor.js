"use strict";
const bigDecimal = require('js-big-decimal');

class Investor {
    constructor(investorAmount) {
        this._name = investorAmount.name
        this._requestedAmount = new bigDecimal(investorAmount.requested_amount)
        this._averageAmount = new bigDecimal(investorAmount.average_amount)
        this._weight = new bigDecimal(0)
        this._actualAllocation = new bigDecimal(0)
    }

    toString() {
        return `Investor: name=${this._name}, ` +
            `requestedAmount=${this._requestedAmount.getValue()}, ` +
            `average_amount=${this._averageAmount.getValue()}, ` +
            `weight=${this._weight.getValue()}, ` +
            `actual_allocation=${this._actualAllocation.getValue()}`
    }

    get averageAmount() {
        return this._averageAmount
    }

    get weight() {
        return this._weight
    }

    get actualAllocation() {
        return this._actualAllocation
    }

    get requestedAmount() {
        return this._requestedAmount
    }

    get name() {
        return this._name
    }

    set weight(weight) {
        this._weight = weight
    }

    set actualAllocation(allocation) {
        this._actualAllocation = allocation
    }

    hasMaximumAllocation() {
        return this._actualAllocation.compareTo(this._requestedAmount) === 0
    }
}

module.exports = Investor