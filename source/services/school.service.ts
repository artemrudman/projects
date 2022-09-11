import { Connection, SqlClient, Error } from 'msnodesqlv8'
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from '../constants';
import { systemError, store } from '../entities';
import { ErrorHelper } from '../helpers/error.helper';
import { SqlHelper } from '../helpers/sql.helper';

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
            
            SqlHelper.executeQueryArrayResult<localStore>(Queries.StoreNames)             
            .then((queryResult: localStore[]) => {
                queryResult.forEach((whiteBoardType: localStore) => {
                    result.push(this.parseLocalStoreName(whiteBoardType))
                });
                resolve(result);
            })
            .catch((error: systemError) => reject(error));
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

    public getStoreName(id: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {    
            
            SqlHelper.executeQuerySingleResult<localStore>(`${Queries.StoreNameById} ${id}`)
            .then((queryResult: localStore) => {
                resolve(this.parseLocalStoreName(queryResult))
            })
            .catch((error: systemError) => reject(error));
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

    private parseLocalStoreName(local: localStore): store {
        return {
            id: local.id,
            store_name: local.store_name
        }
    }
}