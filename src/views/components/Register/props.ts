import { FormComponentProps } from 'antd/lib/form'
import { InjectedIntlProps } from 'react-intl'
import { RegisterDto } from '../../dto/user/user'

export interface ActionProps {
  error(error: ErrorMessage): void
}

export interface MutationProps {
  register(credential: RegisterDto): Anything
}

export type RegisterProps = MutationProps &
  ActionProps &
  FormComponentProps &
  InjectedIntlProps
