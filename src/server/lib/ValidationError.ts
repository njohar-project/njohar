export class ValidationError extends Error {
  name = this.constructor.name
  code = 422
  message: string
  gql = true

  constructor(message: string) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
  }
}
