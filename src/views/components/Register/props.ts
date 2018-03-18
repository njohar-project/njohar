import { AuthResultDto, RegisterDto } from '../../dto/user/user'

export interface ActionProps {
  error(error: ErrorMessage): void
}

export interface MutationProps {
  register(credential: RegisterDto): AuthResultDto
}

export type RegisterProps = MutationProps & ActionProps
