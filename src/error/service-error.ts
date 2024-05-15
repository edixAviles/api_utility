import { ErrorResponse } from "../response"

export default abstract class ServiceError {
  static readonly getException = (error: any): ErrorResponse => {
    return new ErrorResponse(error.name, error.message)
  }
}
