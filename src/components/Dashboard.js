import React, {Component} from 'react'
import auth from './hoc/auth'

class Dashboard extends Component {

  render() {
    return (
      <p>Dashboard</p>
    )
  }
}

export default auth(Dashboard)
