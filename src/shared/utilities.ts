export default class Utilities {
  public static mapToObject(map: Map<string, any>): object {
    return Object.fromEntries(map.entries())
  }
}
