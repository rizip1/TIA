import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {reset} from 'redux-form'
import {withRouter} from 'react-router-dom'

import {login} from '../actions/auth'
import MainPage from '../components/MainPage'


class MainPageContainer extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      return (
        nextProps.history.replace('/dashboard')
      )
    }
  }

  handleSubmitLogin = (values) => {
    this.props.dispatch(reset('login'))
    this.props.login(values.email, values.password)
  }

  handleSubmitRegister = () => {
    this.props.dispatch(reset('registration'))
  }

  render() {
    return (
      <MainPage
        {...this.props}
        handleSubmitLogin={this.handleSubmitLogin}
        handleSubmitRegister={this.handleSubmitRegister}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login,
    dispatch,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPageContainer))
