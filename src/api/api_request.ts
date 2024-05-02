import express, { Express, Router } from "express"
import bodyParser from "body-parser"
import cors from "cors"

import { ApiConfiguration } from "../consts"

export default abstract class ApiRequest {
  static readonly prepare = (path: string, router: Router, origin: string): Express => {
    const app = express()
    app.use(bodyParser.json({ limit: ApiConfiguration.LIMIT_REQUEST }))
    app.use(bodyParser.urlencoded({ limit: ApiConfiguration.LIMIT_REQUEST, extended: true }))
    app.use(path, router)
    app.use(cors({ origin }))

    return app
  }
}
