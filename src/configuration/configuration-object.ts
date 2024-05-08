import ServiceObject from "./service-object"
import VariableObject from "./variable-object"

export default class ConfigurationObject {
  readonly Services: Array<ServiceObject>
  readonly Variables: Array<VariableObject>
}
