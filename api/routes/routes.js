"use strict";

const calculator = require('./calculatorRoutes')

exports.configure = (app) => {
    calculator.configure(app)
}