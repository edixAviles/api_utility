import ErrorResponse from "../response/error_response"

export default abstract class ServiceError {
  public static getException(error: any): ErrorResponse {
    return new ErrorResponse(error.name, error.message)
  }
}
