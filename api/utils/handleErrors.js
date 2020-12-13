"use strict";
const {GenericError} = require('./errors')

/**
 * Handles errors in a clean and standardised manner
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const handleErrors = (err, req, res, next) => {
    let errorCode = 500

    if (err instanceof GenericError) {
        errorCode = err.getErrorCode()
    }

    return res.status(errorCode).json({
        status: 'Error',
        message: err.message
    })
}

module.exports = handleErrors
