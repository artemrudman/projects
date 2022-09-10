import { Connection, SqlClient, Error } from "msnodesqlv8";
import { store } from "../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from "../constants";
import { ErrorHelper } from "../helpers/error.helper";

interface localStore {
    id: number;
    store_name: string;
}

interface ISchoolService {
    getStoreNames(): Promise<store[]>;
    getStoreName(id: number): Promise<store>;
};

export class SchoolService implements ISchoolService {
    public getStoreNames(): Promise<store[]> {
        return new Promise<store[]>((resolve, reject) => {
            const result: store[] = [];
            const sql: SqlClient = require("msnodesqlv8");

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.StoreNames;

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                // Например, сервер не работает
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    connection.query(query, (queryError: Error | undefined, queryResult: localStore[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            const result: store[] = [];
                            if (queryResult !== undefined) {
                                queryResult.forEach(store => {
                                    result.push(
                                        this.parseLocalStoreName(store)
                                    )
                                });
                            }
                            resolve(result);
                        }
                    })
                }
            });
        })
    };

    public getStoreName(id: number): Promise<store> {
        let result: store;
        return new Promise<store>((resolve, reject) => {

            const sql: SqlClient = require("msnodesqlv8");

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.StoreNameById;

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    connection.query(`${query} ${id}`, (queryError: Error | undefined, queryResult: localStore[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            if (queryResult !== undefined && queryResult.length === 1) {
                                result = this.parseLocalStoreName(queryResult[0])
                            }
                            else if (queryResult !== undefined && queryResult.length === 0) {
                                //TO DO: Not Found 
                            }
                            resolve(result);
                        }
                    })
                }
            });
        });
    }

    private parseLocalStoreName(local: localStore): store {
        return {
            id: local.id,
            store_name: local.store_name
        }
    }
}