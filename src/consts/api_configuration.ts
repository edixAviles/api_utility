abstract class ApiConfiguration {
    static isProduction = process.env.NODE_ENV === "production"
    static limitRequest = "5mb"
}

export default ApiConfiguration
