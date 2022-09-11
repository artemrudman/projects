"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlHelper = void 0;
const constants_1 = require("../constants");
const error_helper_1 = require("./error.helper");
class SqlHelper {
    // public static OpenConnection(): Promise<Connection> {
    //     return new Promise<Connection>((resolve, reject) => {
    //         SqlHelper.sql.open(DB_CONNECTION_STRING,  (connectionError: Error, connection: Connection) => {
    //             if (connectionError) {
    //                 reject(ErrorHelper.parseError(ErrorCodes.queryError, General.DbconnectionError));
    //             } 
    //             else {
    //                 resolve(connection);
    //             }
    //         });
    //     });
    // }
    static executeQueryArrayResult(query) {
        return new Promise((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection) => {
                connection.query(query, (queryError, queryResult) => {
                    if (queryError) {
                        reject(error_helper_1.ErrorHelper.parseError(constants_1.ErrorCodes.queryError, constants_1.General.SqlQueryError));
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
                const notFoundError = error_helper_1.ErrorHelper.parseError(constants_1.ErrorCodes.noData, constants_1.General.noDataFound);
                connection.query(query, (queryError, queryResult) => {
                    if (queryError) {
                        reject(error_helper_1.ErrorHelper.parseError(constants_1.ErrorCodes.queryError, constants_1.General.SqlQueryError));
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
    static SqlConnection() {
        return new Promise((resolve, reject) => {
            SqlHelper.sql.open(constants_1.DB_CONNECTION_STRING, (connectionError, connection) => {
                if (connectionError) {
                    reject(error_helper_1.ErrorHelper.parseError(constants_1.ErrorCodes.ConnectionError, constants_1.General.DbconnectionError));
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
