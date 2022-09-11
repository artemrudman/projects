import { Connection, SqlClient, Error } from "msnodesqlv8";
import { DB_CONNECTION_STRING, ErrorCodes, General } from "../constants";
import { ErrorHelper } from "./error.helper";
import { systemError } from "../entities";
import { Request } from "mssql";


export class SqlHelper {
    static sql: SqlClient = require("msnodesqlv8");
    static mssql: SqlClient = require("mssql");

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

    public static executeQueryArrayResult<T>(query: string): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection: Connection) => {
                    connection.query(query, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            if (queryResult !== undefined) {
                                resolve(queryResult);
                            } else {
                                resolve([]);
                            }
                        };
                    });
                })
                .catch((error: ErrorCodes) => {
                    reject(error);
                })
        });
    }

    public static executeQuerySingleResult<T>(query: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            SqlHelper.SqlConnection()
                .then((connection: Connection) => {
                    const notFoundError: ErrorCodes = ErrorHelper.parseError(ErrorCodes.noData, General.noDataFound);
                    connection.query(query, (queryError: Error | undefined, queryResult: T[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            if (queryResult !== undefined) {
                                switch (queryResult.length) {
                                    case 0:
                                        reject(notFoundError)
                                        break;
                                    case 1:
                                        resolve(queryResult[0]);
                                    default:
                                        resolve(queryResult[0]);
                                        break;
                                }
                            } else {
                                reject(notFoundError);
                            }
                        };
                    });
                })
                .catch((error: ErrorCodes) => {
                    reject(error);
                })
        });
    }

    private static SqlConnection(): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            SqlHelper.sql.open(DB_CONNECTION_STRING, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    resolve(connection);
                }
            });
        })
    }

}