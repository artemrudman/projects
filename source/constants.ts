export class ErrorCodes {
    public static ConnectionError: number = 100;
    public static queryError: number = 101;
}

export class General {
    public static DbconnectionError: string = "DB server connection error";
    public static SqlQueryError: string = "Incorrect query";
}

export const DB_CONNECTION_STRING: string = "server=ARTEM_RUDMAN\\NEWMSSQLSERVER;Database=Retail_stores_chain;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

export class Queries {
    public static StoreNames: string = "SELECT * FROM store";
    public static StoreNameById: string = "SELECT * FROM store WHERE id = ";
}