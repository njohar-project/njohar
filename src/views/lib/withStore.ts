import * as withRedux from 'next-redux-wrapper'
import * as React from 'react'
import {
  ConnectOptions,
  MapDispatchToPropsParam,
  MapStateToPropsParam,
  MergeProps
} from 'react-redux'
import { initStore, RootState } from '../store'

export function withStore<  
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
  return withRedux<RootState, TStateProps, TDispatchProps, TOwnProps, TMergedProps>(
    initStore,
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  )(Component)
}