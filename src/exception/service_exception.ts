import ErrorResponse from "../response/error_response"

export default class ServiceException extends Error {
  constructor(error: ErrorResponse) {
    super(error.message)

    this.name = error.code
    this.message = error.message

    Object.setPrototypeOf(this, ServiceException.prototype)
  }
}
