"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queries = exports.TEMP_USER_ID = exports.NON_EXISTENT_ID = exports.DB_CONNECTION_STRING = exports.SqlParameters = exports.General = exports.ErrorCodes = void 0;
class ErrorCodes {
}
exports.ErrorCodes = ErrorCodes;
ErrorCodes.ConnectionError = 100;
ErrorCodes.queryError = 101;
ErrorCodes.noData = 102;
ErrorCodes.NonNumericInput = 103;
ErrorCodes.InputParameterNotSupplied = 104;
ErrorCodes.DeletionConflict = 105;
class General {
}
exports.General = General;
General.GeneralError = "General error";
General.DbconnectionError = "DB server connection error";
General.SqlQueryError = "Incorrect query";
General.noDataFound = "Not found";
General.NonNumericInput = "Non numeric input supplied";
General.InputParameterNotSupplied = "Input parameter not supplied";
General.DeletionConflict = "Delete failed due to conflict";
class SqlParameters {
}
exports.SqlParameters = SqlParameters;
SqlParameters.Id = 'id';
exports.DB_CONNECTION_STRING = "server=ARTEM_RUDMAN\\NEWMSSQLSERVER;Database=Retail_stores_chain;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
exports.NON_EXISTENT_ID = -1;
exports.TEMP_USER_ID = -1;
class Queries {
}
exports.Queries = Queries;
Queries.StoreNames = "SELECT * FROM store";
Queries.StoreNameById = "SELECT * FROM store WHERE id = ";
Queries.StoreNameByTitle = "SELECT * FROM white_board_type WHERE white_board_type LIKE ?";
Queries.UpdateStoreNameById = "UPDATE white_board_type SET white_board_type = ? WHERE id = ?";
Queries.AddStoreName = "INSERT INTO white_board_type (white_board_type) VALUES (?)";
Queries.SelectIdentity = "SELECT SCOPE_IDENTITY() AS id";
Queries.DeleteStoreName = "DELETE FROM white_board_type WHERE id = ?";
