export interface TErrorSource {
    path: string | number;
    message: string;
}

export interface TErrorResponse {
    statusCode: number;
    message: string;
    errorSources: TErrorSource[];
}