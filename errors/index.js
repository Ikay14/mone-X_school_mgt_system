const badRequest = require('./badRequest')
const customError = require('./customAPIError')
const notFound = require('./not-found')
const unauthenticated = require('./unauthenticated')

module.exports = 
{
    badRequest,
    customError,
    notFound,
    unauthenticated
}