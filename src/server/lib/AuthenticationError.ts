export class AuthenticationError extends Error {
  name = this.constructor.name
  code = 401
  message: string
  gql = true

  constructor(message: string) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
  }
}
