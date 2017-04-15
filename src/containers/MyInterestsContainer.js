import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {getInterests, deleteInterest} from '../actions/interests'
import MyInterests from '../components/MyInterests'
import auth from '../components/hoc/auth'

class MyInterestsContainer extends Component {

  static contextTypes = {
    addNotification: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {alreadyFetched: false}
  }

  componentWillMount() {
    const {userId} = this.props
    if (userId) {
      this.fetchInterests(userId)
    }
  }

  fetchInterests = (userId) => {
    this.props.getInterests(userId)
      .then(() => {
        this.setState({alreadyFetched: true})
      })
      .catch((err) => console.error('Could not get interests', err))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId && !this.state.alreadyFetched) {
      this.fetchInterests(nextProps.userId)
    }
  }

  render() {
    return (<MyInterests {...this.props} addNotification={this.context.addNotification} />)
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    interests: state.interests.myInterests.data,
    userLogin: state.auth.userLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getInterests,
    deleteInterest,
  }, dispatch)
}

export default auth(connect(mapStateToProps, mapDispatchToProps)(MyInterestsContainer))
