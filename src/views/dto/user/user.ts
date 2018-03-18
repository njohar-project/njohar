export interface UserDto {
  id: string
  name: string
}

export interface RegisterDto {
  name: string
  username: string
  password: string
}

export interface LoginDto {
  username: string
  password: string
}

export interface AuthResultDto {
  token: string
  user: UserDto
}