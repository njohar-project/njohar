import * as React from 'react'
import {
  ConnectOptions,
  MapDispatchToPropsParam,
  MapStateToPropsParam,
  MergeProps
} from 'react-redux'
import withData from './withData'
import { PageProps, withPage } from './withPage'
import { withStore } from './withStore'

export { PageProps }

export function wrap<
  TStateProps = {},
  TDispatchProps = {},
  TOwnProps = {},
  TMergedProps = {}
>(
  Component: React.ComponentClass<TOwnProps & TMergedProps>,
  mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, {}>,
  mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
  mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
  options?: ConnectOptions
) {
  return withStore(
    // tslint:disable-next-line:no-any
    (withData(withPage(Component) as any)) as any,
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  )
}
