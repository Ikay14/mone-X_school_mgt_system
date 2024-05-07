const customAPIError = require('./customAPIError')
const { StatusCodes } = require('http-status-codes')

class unAuthenticatedError extends customAPIError {
    constructor(message) {
        super(message)
        this.StatusCodes = StatusCodes.UNAUTHORIZED
    }
}

module.exports =unAuthenticatedError