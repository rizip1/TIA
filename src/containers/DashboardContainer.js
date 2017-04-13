import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {getInterests, assignToInterest, unassignFromInterest} from '../actions/interests'
import Dashboard from '../components/Dashboard'
import auth from '../components/hoc/auth'
import {withNtf} from '../utils'

const messages = {
  assignSucces: 'Boli ste pridaný k vybratej túre.',
  unassignSuccess: 'Boli ste odhlásený z vybratej túry.',
}

class DashboardContainer extends Component {

  static contextTypes = {
    addNotification: PropTypes.func,
  }

  componentWillMount() {
    this.props.getInterests()
      .catch((err) => console.error('Could not get interests', err))
  }

  render() {
    const {addNotification: addNtf} = this.context
    const {assignToInterest, unassignFromInterest} = this.props

    return (
      <Dashboard {...this.props}
        assignToInterest={withNtf(assignToInterest, addNtf, [messages.assignSucces])}
        unassignFromInterest={withNtf(unassignFromInterest, addNtf, [messages.unassignSuccess])}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    interests: state.interests.allInterests.data,
    userLogin: state.auth.userLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getInterests,
    assignToInterest,
    unassignFromInterest,
  }, dispatch)
}

export default auth(connect(mapStateToProps, mapDispatchToProps)(DashboardContainer))
