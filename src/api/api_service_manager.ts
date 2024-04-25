import axios, { AxiosError } from "axios"

import HttpMethods from "../consts/http_methods"
import RequestDataDto from "./request_data_dto"
import HttpStatusCode from "../consts/http_status_code"
import ServiceException from "../exception/service_exception"
import ErrorResponse from "../response/error_response"
import ApiResponseDto from "./api_response_dto"

export default class ApiServiceManager {
  readonly sendRequest = async <T>(request: RequestDataDto, type: HttpMethods): Promise<T | null> => {
    const data = await this.handleRequest<T>(request, type)
    return data
  }

  private readonly handleRequest = async <T>(request: RequestDataDto, type: HttpMethods): Promise<T> => {
    const response = new ApiResponseDto<T>()

    try {
      switch (type) {
        case HttpMethods.GET:
          ({ data: response.data, status: response.status } = await axios.get<T>(request.urlBase))
          break
        case HttpMethods.POST:
          ({ data: response.data, status: response.status } = await axios.post<T>(request.urlBase, request.body))
          break
        case HttpMethods.PATCH:
          ({ data: response.data, status: response.status } = await axios.patch<T>(request.urlBase, request.body))
          break
        case HttpMethods.PUT:
          ({ data: response.data, status: response.status } = await axios.put<T>(request.urlBase, request.body))
          break
        case HttpMethods.DELETE:
          ({ data: response.data, status: response.status } = await axios.get<T>(request.urlBase))
          break
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ServiceException(new ErrorResponse(error.code || "", error.response?.statusText || ""))
      }
    }

    if (response.status != HttpStatusCode.OK) {
      throw new ServiceException(new ErrorResponse(response.status.toString(), ""))
    }

    return response.data
  }
}
