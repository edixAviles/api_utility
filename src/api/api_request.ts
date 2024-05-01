import express, { Router } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import middleware from "i18next-http-middleware"
import i18next from "i18next"

import { ApiConfiguration } from "../consts"

export default class ApiRequest {
  readonly listen = (path: string, router: Router, origin: string, localizer: typeof i18next) => {
    const port = process.env.PORT || 3000
    const originCors = {
      origin: ApiConfiguration.isProduction ? origin : "*",
    }

    const app = express()
    app.use(middleware.handle(localizer))
    app.use(bodyParser.json({ limit: ApiConfiguration.limitRequest }))
    app.use(bodyParser.urlencoded({ limit: ApiConfiguration.limitRequest, extended: true }))

    app.use(cors(originCors))
    app.use(path, router)
    app.listen(port, () => {
      console.info(`Server listening on ${port}`)
    })
  }
}
