const {GenericError} = require('./errors')

// Handle errors thrown in a clean standardised way
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
