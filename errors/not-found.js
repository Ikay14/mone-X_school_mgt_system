const customAPIError = require('./customAPIError')
const { StatusCodes } = require('http-status-codes')

class notFoundError extends customAPIError {
    constructor(message) {
        super(message)
        this.StatusCodes = StatusCodes.NOT_FOUND
    }
}

module.exports = notFoundError