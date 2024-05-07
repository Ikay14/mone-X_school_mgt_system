const badRequestError = require('./badRequest')
const notFoundError = require('./not-found')
const unAuthenticatedError =require('./unauthenticated')
const customAPIError = require('./customAPIError')

 module.exports  = {
    badRequestError,
    notFoundError,
    unAuthenticatedError,
    customAPIError
 }