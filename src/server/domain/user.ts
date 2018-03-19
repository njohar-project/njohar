export interface User {
  _id: string
  credentials: {
    username: string
    password: string
  }
  name: string
  roles: string[]
}
