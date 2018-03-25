import { UserDto } from '../../../../dto/user/user'

export interface AdminHeaderStateProps {
  authenticated?: boolean
  user?: UserDto
  sidebarCollapsed: boolean
}

export interface AdminHeaderActionProps {
  logout: () => void
  changeLanguage: (language: string) => void
}

export interface AdminHeaderOwnProps {
  onCollapse(): void
}

export type AdminHeaderProps = WithRouteProps &
  AdminHeaderStateProps &
  AdminHeaderActionProps &
  WithLangProps &
  AdminHeaderOwnProps
