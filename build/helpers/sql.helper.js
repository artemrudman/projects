"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlHelper = void 0;
const error_helper_1 = require("./error.helper");
const constants_1 = require("../constants");
const constants_2 = require("../constants");
class SqlHelper {
    static executeQueryArrayResult(query) {
        return new Promise((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection) => {
                connection.query(query, (queryError, queryResult) => {
                    if (queryError) {
                        reject(error_helper_1.ErrorHelper.parseError(constants_2.ErrorCodes.queryError, constants_2.General.SqlQueryError));
                    }
                    else {
                        if (queryResult !== undefined) {
                            resolve(queryResult);
                        }
                        else {
                            resolve([]);
                        }
                    }
                    ;
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static executeQuerySingleResult(query) {
        return new Promise((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection) => {
                const notFoundError = error_helper_1.ErrorHelper.parseError(constants_2.ErrorCodes.noData, constants_2.General.noDataFound);
                connection.query(query, (queryError, queryResult) => {
                    if (queryError) {
                        reject(error_helper_1.ErrorHelper.parseError(constants_2.ErrorCodes.queryError, constants_2.General.SqlQueryError));
                    }
                    else {
                        if (queryResult !== undefined) {
                            switch (queryResult.length) {
                                case 0:
                                    reject(notFoundError);
                                    break;
                                case 1:
                                    resolve(queryResult[0]);
                                default:
                                    resolve(queryResult[0]);
                                    break;
                            }
                        }
                        else {
                            reject(notFoundError);
                        }
                    }
                    ;
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static createNew(query, original, ...params) {
        return new Promise((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection) => {
                const queries = [query, constants_1.Queries.SelectIdentity];
                const executeQuery = queries.join(';');
                const badQuerryError = error_helper_1.ErrorHelper.parseError(constants_2.ErrorCodes.queryError, constants_2.General.SqlQueryError);
                let executionCounter = 0;
                connection.query(executeQuery, params, (queryError, queryResult) => {
                    if (queryError) {
                        reject(error_helper_1.ErrorHelper.parseError(constants_2.ErrorCodes.queryError, constants_2.General.SqlQueryError));
                    }
                    else {
                        executionCounter++;
                        if (executionCounter === queries.length) {
                            if (queryResult !== undefined) {
                                if (queryResult.length == 1) {
                                    original.id = queryResult[0].id;
                                    resolve(original);
                                }
                                else {
                                    reject(badQuerryError);
                                }
                            }
                            else {
                                reject(badQuerryError);
                            }
                            ;
                        }
                    }
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static executeQueryNoResult(query, ...params) {
        return new Promise((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection) => {
                const q = connection.query(query, params, (queryError, rows) => {
                    if (queryError) {
                        switch (queryError.code) {
                            case 547:
                                reject(error_helper_1.ErrorHelper.parseError(constants_2.ErrorCodes.DeletionConflict, constants_2.General.DeletionConflict));
                                break;
                            default:
                                reject(error_helper_1.ErrorHelper.parseError(constants_2.ErrorCodes.queryError, constants_2.General.SqlQueryError));
                                break;
                        }
                    }
                });
                q.on('rowcount', (rowCount) => {
                    if (rowCount === 0) {
                        reject(error_helper_1.ErrorHelper.parseError(constants_2.ErrorCodes.noData, constants_2.General.noDataFound));
                        return;
                    }
                    resolve();
                });
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    static SqlConnection() {
        return new Promise((resolve, reject) => {
            SqlHelper.sql.open(constants_1.DB_CONNECTION_STRING, (connectionError, connection) => {
                if (connectionError) {
                    reject(error_helper_1.ErrorHelper.parseError(constants_2.ErrorCodes.ConnectionError, constants_2.General.DbconnectionError));
                }
                else {
                    resolve(connection);
                }
            });
        });
    }
}
exports.SqlHelper = SqlHelper;
SqlHelper.sql = require("msnodesqlv8");
SqlHelper.mssql = require("mssql");
