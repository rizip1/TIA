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

  handleSubmitLogin = () => {
    this.props.dispatch(reset('login'))
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
