export class HttpError extends Error {
    
    constructor (message: string, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}