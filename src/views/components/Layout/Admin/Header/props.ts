import { UserDto } from '../../../../dto/user/user'

export interface AdminHeaderStateProps {
  authenticated?: boolean
  user?: UserDto
}

export interface AdminHeaderActionProps {
  logout: () => void
  changeLanguage: (language: string) => void
}

export type AdminHeaderProps = WithRouteProps &
  AdminHeaderStateProps &
  AdminHeaderActionProps &
  WithLangProps
