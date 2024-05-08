import { readFileSync } from "fs"
import ConfigurationObject from "./configuration-object"

export default class AppConfigurationManager {
  private static instance: AppConfigurationManager
  private configurationObject: ConfigurationObject

  private constructor(pathConfig: string) {
    const data = readFileSync(pathConfig, { encoding: "utf8", flag: "r" })
    this.configurationObject = JSON.parse(data).AppConfiguration as ConfigurationObject

    /*readFile(pathConfig, "utf8", (error, data) => {
      if (error) {
        console.log(error)
        return
      }

    })*/
  }

  readonly getServiceUrlBySystemControllerCapacity = (system: string, controller: string, capacity: string): string | undefined => {
    return this.configurationObject
      .Services.find(list => list.System === system)
      ?.Controllers.find(list => list.Name === controller)
      ?.Capabilities.find(list => list.Name === capacity)
      ?.Value
  }

  readonly getVariableByTypeName = (type: string, name: string): string | undefined => {
    return this.configurationObject
      .Variables.find(list => list.Type === type)
      ?.Values.find(list => list.Name === name)
      ?.Value
  }

  static readonly getInstance = (pathConfig: string): AppConfigurationManager => {
    if (!AppConfigurationManager.instance) {
      AppConfigurationManager.instance = new AppConfigurationManager(pathConfig)
    }

    return AppConfigurationManager.instance
  }
}
