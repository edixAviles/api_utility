import express, { Express, Router } from "express"
import bodyParser from "body-parser"
import cors from "cors"

import { ApiConfiguration } from "../consts"

export default abstract class ApiRequest {
  static readonly listen = (path: string, router: Router, origin: string, port: number): Express => {
    const originCors = {
      origin: ApiConfiguration.isProduction ? origin : "*",
    }

    const app = express()
    app.use(bodyParser.json({ limit: ApiConfiguration.limitRequest }))
    app.use(bodyParser.urlencoded({ limit: ApiConfiguration.limitRequest, extended: true }))

    app.use(cors(originCors))
    app.use(path, router)
    app.listen(port, () => {
      console.info(`Server listening on ${port}`)
    })

    return app
  }
}
