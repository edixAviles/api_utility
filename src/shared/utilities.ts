export default class Utilities {
  static readonly mapToObject = (map: Map<string, any>): object => {
    return Object.fromEntries(map.entries())
  }
}
