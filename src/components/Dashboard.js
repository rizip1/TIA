import React, {Component} from 'react'

import InterestsList from './InterestsList'

class Dashboard extends Component {

  render() {
    return <InterestsList {...this.props} />
  }
}

export default Dashboard
