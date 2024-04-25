export default class ErrorResponse {
  code: string
  message: string
  details?: string

  constructor(code: string, message: string, details?: string) {
    this.code = code
    this.message = message
    this.details = details
  }
}
