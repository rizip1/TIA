import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

function auth(WrappedComponent) {
  const authComponent = class extends React.Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
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
  }
}

export default auth
