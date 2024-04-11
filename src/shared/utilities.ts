export default class Utilities {
  static mapToObject(map: Map<string, any>): object {
    return Object.fromEntries(map.entries())
  }
}
