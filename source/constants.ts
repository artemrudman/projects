export class ErrorCodes {
    public static ConnectionError: number = 100;
    public static queryError: number = 101;
    public static noData: number = 102;
    public static NonNumericInput: number = 103;
    public static InputParameterNotSupplied: number = 104;
    public static DeletionConflict: number = 105;
}

export class General {
    public static GeneralError: string = "General error";
    public static DbconnectionError: string = "DB server connection error";
    public static SqlQueryError: string = "Incorrect query";
    public static noDataFound: string = "Not found";
    public static NonNumericInput: string = "Non numeric input supplied";
    public static InputParameterNotSupplied: string = "Input parameter not supplied";
    public static DeletionConflict: string = "Delete failed due to conflict";
}

export class SqlParameters {
    public static Id: string = 'id';
}

export const DB_CONNECTION_STRING: string = "server=ARTEM_RUDMAN\\NEWMSSQLSERVER;Database=Retail_stores_chain;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export const NON_EXISTENT_ID: number = -1;
export const TEMP_USER_ID: number = -1;


export class Queries {
    public static StoreNames: string = "SELECT * FROM store";
    public static StoreNameById: string = "SELECT * FROM store WHERE id = ";
    public static StoreNameByTitle: string = "SELECT * FROM store WHERE store_name LIKE ?";
    public static UpdateStoreNameById: string = "UPDATE store SET store_name = ? WHERE id = ?";
    public static AddStoreName: string = "INSERT INTO store (store_name) VALUES (?)";
    public static SelectIdentity: string = "SELECT SCOPE_IDENTITY() AS id";
    public static DeleteStoreName: string = "DELETE FROM store WHERE id = ?";
}