"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queries = exports.DB_CONNECTION_STRING = exports.General = exports.ErrorCodes = void 0;
class ErrorCodes {
}
exports.ErrorCodes = ErrorCodes;
ErrorCodes.ConnectionError = 100;
ErrorCodes.queryError = 101;
ErrorCodes.noData = 102;
class General {
}
exports.General = General;
General.DbconnectionError = "DB server connection error";
General.SqlQueryError = "Incorrect query";
General.noDataFound = "Not found";
exports.DB_CONNECTION_STRING = "server=ARTEM_RUDMAN\\NEWMSSQLSERVER;Database=Retail_stores_chain;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
class Queries {
}
exports.Queries = Queries;
Queries.StoreNames = "SELECT * FROM store";
Queries.StoreNameById = "SELECT * FROM store WHERE id = ";
