import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

function auth(WrappedComponent) {
  const authComponent = class extends React.Component {
    componentWillReceiveProps(nextProps) {
      const {isAuthenticated, checkedLogin} = nextProps
      if (!isAuthenticated && checkedLogin) {
        this.props.history.replace('/')
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return withRouter(connect(mapStateToProps, null)(authComponent))
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    checkedLogin: state.auth.checkedLogin,
  }
}

export default auth
