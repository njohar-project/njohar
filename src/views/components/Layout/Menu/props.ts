import { UserDto } from '../../../dto/user/user'

export interface PageMenuStateProps {
  authenticated?: boolean
  user?: UserDto
}

export interface PageMenuActionProps {
  logout: () => void
  changeLanguage: (language: string) => void
}

export type PageMenuProps = WithRouteProps &
  PageMenuStateProps &
  PageMenuActionProps &
  WithLangProps
