export class ApiError extends Error {
    constructor(public message: string, public status: number = 500, public details?: any) {
        super(message);
    }
}