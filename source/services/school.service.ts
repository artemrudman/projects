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
    updateStoreName(store: store): Promise<store>;
    addStoreName(store: store): Promise<store>;
    deleteStoreNameById(id: number): Promise<void>;
};

export class SchoolService implements ISchoolService {
    
    public getStoreNames(): Promise<store[]> {
        return new Promise<store[]>((resolve, reject) => {
            const result: store[] = [];
            
            SqlHelper.executeQueryArrayResult<localStore>(Queries.StoreNames)             
            .then((queryResult: localStore[]) => {
                queryResult.forEach((StoreNames: localStore) => {
                    result.push(this.parseLocalStoreName(StoreNames))
                });
                resolve(result);
            })
            .catch((error: systemError) => reject(error));
        });
    }


    public getStoreName(id: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {    
            
            SqlHelper.executeQuerySingleResult<localStore>(`${Queries.StoreNameById} ${id}`)
            .then((queryResult: localStore) => {
                resolve(this.parseLocalStoreName(queryResult))
            })
            .catch((error: systemError) => reject(error));
        });
    }
    

    public updateStoreName(store: store): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            SqlHelper.executeQueryNoResult<store>(Queries.UpdateStoreNameById, store.store_name, store.id)
                .then(() => {
                    resolve(store);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public addStoreName(store: store): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            SqlHelper.createNew<store>(Queries.AddStoreName, store, store.store_name)
                .then((result: store) => {
                    resolve(result);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public deleteStoreNameById(id: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SqlHelper.executeQueryNoResult<localStore>(Queries.DeleteStoreName, id)
                .then(() => {
                    resolve();
                })
                .catch((error: systemError) => {
                    reject(error);
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