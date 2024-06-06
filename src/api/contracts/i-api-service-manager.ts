import { HttpMethods } from "../../consts"
import RequestDataDto from "./request-data-dto"

export interface IApiServiceManager {
  sendRequest<T>(request: RequestDataDto, type: HttpMethods): Promise<T>
}
