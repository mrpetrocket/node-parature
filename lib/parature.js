/**
 * Entry point for node-parature
 */
var _ = require("lodash");
var format = require("string-template");
var request = require("request-promise");
var validate = require("validate.js");

/**
 * Creates a new instance of the Parature interface
 * @param {Object} opts Required properties: accountId, departmentId, instance, token. Future growth: apiVersion
 */
function Parature(opts) {
    // validate constructor parameters
    var constraints = {
        "accountId": {
            presence: true
        },
        "departmentId": {
            presence: true
        },
        "instance": {
            presence: true
        },
        "token": {
            presence: true
        }
    };
    var results = validate(opts, constraints);
    if (results) {
        // validation failed
        console.error(results);
        throw new Error("Missing parameters");
    }

    this.config = {
        accountId: opts.accountId,
        apiVersion: 1,
        departmentId: opts.departmentId,
        instance: opts.instance,
        token: opts.token
    };

}

/**
 * Make a REST call to the Parature API
 * @param {String} method
 * @param {String} route Ex. "Tickets/" or "Customer/15"
 * @param {String} body Stringified XML. xml2js works nicely
 * @param {Object} [opts] Optional request parameters
 * @returns Promise
 */
Parature.prototype.execute = function(method, route, body, opts) {
    const URL_TEMPLATE = "{instance}/api/v{apiVersion}/{accountId}/{departmentId}/{route}?_token_={token}";
    var params = {
        route: route
    };
    _.merge(params, this.config);
    var url = format(URL_TEMPLATE, params);

    console.log(method.toUpperCase(), "/" + route);

    return request({
        body: body,
        method: method,
        type: 'xml',
        url: url
    });
};

module.exports = Parature;
