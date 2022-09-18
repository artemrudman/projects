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
                queryResult.forEach((StoreNames) => {
                    result.push(this.parseLocalStoreName(StoreNames));
                });
                resolve(result);
            })
                .catch((error) => reject(error));
        });
    }
    getStoreName(id) {
        return new Promise((resolve, reject) => {
            sql_helper_1.SqlHelper.executeQuerySingleResult(`${constants_1.Queries.StoreNameById} ${id}`)
                .then((queryResult) => {
                resolve(this.parseLocalStoreName(queryResult));
            })
                .catch((error) => reject(error));
        });
    }
    updateStoreName(store) {
        return new Promise((resolve, reject) => {
            sql_helper_1.SqlHelper.executeQueryNoResult(constants_1.Queries.UpdateStoreNameById, store.store_name, store.id)
                .then(() => {
                resolve(store);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    addStoreName(store) {
        return new Promise((resolve, reject) => {
            sql_helper_1.SqlHelper.createNew(constants_1.Queries.AddStoreName, store, store.store_name)
                .then((result) => {
                resolve(result);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    deleteStoreNameById(id) {
        return new Promise((resolve, reject) => {
            sql_helper_1.SqlHelper.executeQueryNoResult(constants_1.Queries.DeleteStoreName, id)
                .then(() => {
                resolve();
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    parseLocalStoreName(local) {
        return {
            id: local.id,
            store_name: local.store_name
        };
    }
}
exports.SchoolService = SchoolService;
