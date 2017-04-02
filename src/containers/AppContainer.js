import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {setLoginStatus} from '../actions/auth'
import App from '../components/App'


class AppContainer extends Component {

  componentWillMount() {
    this.props.setLoginStatus()
  }

  render() {
    return (
      <App />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setLoginStatus,
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(AppContainer)
