export class AuthorizationError extends Error {
    constructor(message = 'anda tidak berhak mengakses resource ini') {
        super(message);
        this.statusCode = 401;
    }
}