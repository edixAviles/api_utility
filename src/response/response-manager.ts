import Response from "./response"
import ErrorResponse from "./error-response"

export default class ResponseManager<T> {
  readonly onSuccess = (response: T): Response<T> => {
    return new Response<T>({
      success: true,
      result: response,
    })
  }

  readonly onError = (error: ErrorResponse): Response<T> => {
    return new Response<T>({
      success: false,
      error: error,
    })
  }
}
