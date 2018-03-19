export interface User {
  _id: string
  credentials: {
    email: string
    password: string
  }
  name: string
  roles: string[]
}
