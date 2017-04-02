import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {reset, SubmissionError} from 'redux-form'
import {withRouter} from 'react-router-dom'

import {login, register} from '../actions/auth'
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
    // need to return promise because of redux-form
    this.props.dispatch(reset('login'))
    return this.props.login(values)
      .catch((err) => {
        const errorObj = {}
        if (!err.status || err.status >= 500) {
          errorObj._error = true
        }
        throw new SubmissionError(errorObj)
      })
  }

  handleSubmitRegister = (values) => {
    // need to return promise because of redux-form
    return this.props.register(values)
      .then(() => {
        this.props.dispatch(reset('registration'))
      })
      .catch((err) => {
        const errorObj = {}
        if (err.field) {
          errorObj[err.field] = err.translate
        } else {
          errorObj._error = true
        }
        throw new SubmissionError(errorObj)
      })
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
    register,
    dispatch,
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPageContainer))
