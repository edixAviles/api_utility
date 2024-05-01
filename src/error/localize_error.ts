import { i18n } from "i18next"
import { ErrorResponse } from "../response"
import { Utilities } from "../shared"

type I18next = i18n

export default class LocalizeError {
  readonly localizer: I18next

  constructor(localizer: I18next) {
    this.localizer = localizer
  }

  readonly getError = (code: string, params?: Map<string, string>): ErrorResponse => {
    const keys = new Map<string, string>()
    if (params != undefined) {
      for (const param of params.entries()) {
        keys.set(param[0], param[1])
      }
    }

    let objectKeys = {}
    objectKeys = Utilities.mapToObject(keys)

    const message = this.localizer.t(code, objectKeys)
    return new ErrorResponse(code, message)
  }
}
