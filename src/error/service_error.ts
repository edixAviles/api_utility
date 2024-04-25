import ErrorResponse from "../response/error_response"

export default abstract class ServiceError {
  static getException(error: any): ErrorResponse {
    return new ErrorResponse(error.name, error.message)
  }
}
