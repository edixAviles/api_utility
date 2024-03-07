import ErrorResponse from "../response/error_response"

abstract class ServiceError {
    public static getException(error: any): ErrorResponse {
        return new ErrorResponse(error.name, error.message)
    }
}

export default ServiceError
