import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'

import {logout} from '../actions/auth'

class LogoutContainer extends Component {

  componentWillMount() {
    this.props.logout()
      .then(() => this.props.history.replace('/'))
      .catch(() => console.error('Could not logout'))
  }

  render() {
    const {error} = this.props
    if (error) {
      return (<p>Nepodarilo sa odhlásiť, skontrolujte pripojenie k internetu.</p>)
    } else {
      return (<p>Odhlasujem ...</p>)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.logout.error,
  }
}



const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoutContainer))
