import { readFileSync } from "fs"
import ConfigurationObject from "./configuration-object"

export default class AppConfigurationManager {
  private static instance: AppConfigurationManager
  private configurationObject: ConfigurationObject

  private constructor(configPath: string, values: object) {
    let data = readFileSync(configPath, { encoding: "utf8", flag: "r" })

    for (const [key, value] of Object.entries(values)) {
      data = data.replaceAll(key, `#{${value}}#`)
    }

    this.configurationObject = JSON.parse(data).AppConfiguration as ConfigurationObject
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

  static readonly build = (configPath: string, values: object): void => {
    if (!AppConfigurationManager.instance) {
      AppConfigurationManager.instance = new AppConfigurationManager(configPath, values)
    }
  }

  static readonly getInstance = (): AppConfigurationManager => {
    return AppConfigurationManager.instance
  }
}
