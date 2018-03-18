import * as React from 'react'
import {
  ConnectOptions,
  MapDispatchToPropsParam,
  MapStateToPropsParam,
  MergeProps
} from 'react-redux'

import withData from './withData'
import { withStore } from './withStore'

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
    withData(Component) as any,
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  )
}
