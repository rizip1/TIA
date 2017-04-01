import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {reset} from 'redux-form'

import MainPage from '../components/MainPage'


class MainPageContainer extends Component {

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.history.replace('/dashboard')
    }
  }

  handleSubmitLogin = (values) => {
    console.log('values', values)

    const options = {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
      }),
    }

    this.props.dispatch(reset('login'))

    fetch('/auth/login', options)
      .then((res) => console.log('success', res))
      .catch((e) => console.error(e))
  }

  handleSubmitRegister = () => {
    this.props.dispatch(reset('registration'))
  }

  render() {
    return (
      <MainPage
        handleSubmitLogin={this.handleSubmitLogin}
        handleSubmitRegister={this.handleSubmitRegister}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatch,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContainer)
