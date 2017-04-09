import React, {Component} from 'react'

import Dashboard from './Dashboard'

class MyInterests extends Component {

  render() {
    return (
      <Dashboard {...this.props} my={true} />
    )
  }
}

export default MyInterests
