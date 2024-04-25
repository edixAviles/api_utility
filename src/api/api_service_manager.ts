import axios, { AxiosError } from "axios"

import HttpMethods from "../consts/http_methods"
import RequestDataDto from "./request_data_dto"
import HttpStatusCode from "../consts/http_status_code"
import ServiceException from "../exception/service_exception"
import ErrorResponse from "../response/error_response"
import ApiResponseDto from "./api_response_dto"

export default class ApiServiceManager {
  readonly sendRequestAsync =  <T>(request: RequestDataDto, type: HttpMethods): Promise<T | null> => {
    const data = await this.handleRequestAsync<T>(request, type)
    return data
  }

  private readonly handleRequestAsync =  <T>(request: RequestDataDto, type: HttpMethods): Promise<T> => {
    const apiResponse = new ApiResponseDto<T>()

    try {
      switch (type) {
        case HttpMethods.GET:
          ({ data: apiResponse.data, status: apiResponse.status } = await axios.get<T>(request.urlBase))
          break
        case HttpMethods.POST:
          ({ data: apiResponse.data, status: apiResponse.status } = await axios.post<T>(request.urlBase, request.body))
          break
        case HttpMethods.PATCH:
          ({ data: apiResponse.data, status: apiResponse.status } = await axios.patch<T>(request.urlBase, request.body))
          break
        case HttpMethods.PUT:
          ({ data: apiResponse.data, status: apiResponse.status } = await axios.put<T>(request.urlBase, request.body))
          break
        case HttpMethods.DELETE:
          ({ data: apiResponse.data, status: apiResponse.status } = await axios.get<T>(request.urlBase))
          break
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ServiceException(new ErrorResponse(error.code || "", error.response?.statusText || ""))
      }
    }

    if (apiResponse.status != HttpStatusCode.OK) {
      throw new ServiceException(new ErrorResponse(apiResponse.status.toString(), ""))
    }

    return apiResponse.data
  }
}
