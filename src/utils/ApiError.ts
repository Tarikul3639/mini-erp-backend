interface TErrorSource {
    path: string | number;
    message: string;
}

export default class ApiError extends Error {
    statusCode: number;
    errorSources: TErrorSource[];

    constructor(
        statusCode: number,
        message: string,
        errorSources: TErrorSource[] = []
    ) {
        super(message);

        this.statusCode = statusCode;
        this.errorSources = errorSources;

        Error.captureStackTrace(this, this.constructor);
    }
}