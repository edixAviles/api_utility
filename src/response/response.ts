import ErrorResponse from "./error-response"

export default class Response<T> {
  success: boolean
  result: T
  error: ErrorResponse

  constructor(init?: Partial<Response<T>>) {
    Object.assign(this, init)
  }
}
