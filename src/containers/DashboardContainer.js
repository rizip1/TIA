import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {getInterests, assignToInterest} from '../actions/interests'
import Dashboard from '../components/Dashboard'
import auth from '../components/hoc/auth'

class DashboardContainer extends Component {

  static contextTypes = {
    addNotification: PropTypes.func,
  }

  componentWillMount() {
    this.props.getInterests()
      .catch((err) => console.error('Could not get interests', err))
  }

  assignToInterest = (id) => {
    this.props.assignToInterest(id)
      .then(() => {
        this.context.addNotification('Boli ste pridaný k vybranej túre.')
      }).catch((err) => console.error('Could not assign to interest', err))
  }

  render() {
    return (<Dashboard {...this.props} assignToInterest={this.assignToInterest} />)
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    interests: state.interests.interests.interests,
    userLogin: state.auth.userLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getInterests,
    assignToInterest,
  }, dispatch)
}

export default auth(connect(mapStateToProps, mapDispatchToProps)(DashboardContainer))
