const customAPIError = require('./customAPIError')
const { StatusCodes } = require('http-status-codes')

class badRequestError extends customAPIError {
    constructor(message) {
        super(message) 
        this.StatusCodes = StatusCodes.BAD_REQUEST
    }
}

module.exports = badRequestError