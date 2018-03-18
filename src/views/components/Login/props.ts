import { AuthResultDto, LoginDto } from '../../dto/user/user'

export interface MutationProps {
  login(credential: LoginDto): AuthResultDto
  error(error: ErrorMessage): void
}

export type LoginProps = MutationProps & WithLangProps
