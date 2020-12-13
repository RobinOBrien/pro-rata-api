"use strict";

class GenericError extends Error {
    constructor(message) {
        super();
        this.message = message
    }

    getErrorCode() {
        switch (this.constructor) {
            case BadRequestError:
                return 400
        }
    }
}

class BadRequestError extends GenericError {
}

module.exports = {
    GenericError,
    BadRequestError
}