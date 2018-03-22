import { Spin } from 'antd'
import * as React from 'react'

export class Wait extends React.PureComponent {
  render() {
    return (
      <div>
        <style jsx="true">{`
          .spin-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }

          .spin-container .spinner {
            position: absolute;
            top: 50%;
            left: 50%;
          }
        `}</style>
        <div className="spin-container">
          <Spin className="spinner" size="large" />
        </div>
      </div>
    )
  }
}
