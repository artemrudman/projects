"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
const constants_1 = require("../constants");
const sql_helper_1 = require("../helpers/sql.helper");
;
class SchoolService {
    getStoreNames() {
        return new Promise((resolve, reject) => {
            const result = [];
            sql_helper_1.SqlHelper.executeQueryArrayResult(constants_1.Queries.StoreNames)
                .then((queryResult) => {
                queryResult.forEach((whiteBoardType) => {
                    result.push(this.parseLocalStoreName(whiteBoardType));
                });
                resolve(result);
            })
                .catch((error) => reject(error));
        });
    }
    // public getStoreNames(): Promise<store[]> {
    //     return new Promise<store[]>((resolve, reject) => {
    //         const sql: SqlClient = require("msnodesqlv8");
    //         const connectionString: string = DB_CONNECTION_STRING;
    //         const result: store[] = [];
    //         SqlHelper.OpenConnection()
    //             .then((connection: Connection) => {
    //                 connection.query(Queries.StoreNames, (queryError: Error | undefined, queryResult: localStore[] | undefined) => {
    //                     if (queryError) {
    //                         reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
    //                     }
    //                     else {
    //                         if (queryResult !== undefined) {
    //                             queryResult.forEach(
    //                                 (StoreName: localStore) => {
    //                                     result.push(this.parseLocalStoreName(StoreName))
    //                                 });
    //                         }
    //                         //console.log(result);
    //                         resolve(result);
    //                     }   
    //                 })
    //             })
    //             .catch((error: systemError) => reject(error));
    //     });
    // }
    getStoreName(id) {
        return new Promise((resolve, reject) => {
            sql_helper_1.SqlHelper.executeQuerySingleResult(`${constants_1.Queries.StoreNameById} ${id}`)
                .then((queryResult) => {
                resolve(this.parseLocalStoreName(queryResult));
            })
                .catch((error) => reject(error));
        });
    }
    // public getStoreName(id: number): Promise<store> {
    //     let result: store;
    //     return new Promise<store>((resolve, reject) => {
    //         const sql: SqlClient = require("msnodesqlv8");
    //         const connectionString: string = DB_CONNECTION_STRING;
    //         const query: string = Queries.StoreNameById;
    //         sql.open(connectionString, (connectionError: Error, connection: Connection) => {
    //             if (connectionError) {
    //                 reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
    //             }
    //             else {
    //                 connection.query(`${query} ${id}`, (queryError: Error | undefined, queryResult: localStore[] | undefined) => {
    //                     if (queryError) {
    //                         reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
    //                     }
    //                     else {
    //                         if (queryResult !== undefined && queryResult.length === 1) {
    //                             result = this.parseLocalStoreName(queryResult[0])
    //                         }
    //                         else if (queryResult !== undefined && queryResult.length === 0) {
    //                             //TO DO: Not Found 
    //                         }
    //                         resolve(result);
    //                     }
    //                 })
    //             }
    //         });
    //     });
    // }
    parseLocalStoreName(local) {
        return {
            id: local.id,
            store_name: local.store_name
        };
    }
}
exports.SchoolService = SchoolService;
