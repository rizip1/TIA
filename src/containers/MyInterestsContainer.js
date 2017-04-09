import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {getInterests} from '../actions/interests'
import MyInterests from '../components/MyInterests'
import auth from '../components/hoc/auth'

class MyInterestsContainer extends Component {

  componentWillMount() {
    this.props.getInterests(this.props.userId)
      .then((res) => console.log('res', res))
      .catch((err) => console.error('Could not get interests', err))
  }

  render() {
    return (<MyInterests {...this.props} />)
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getInterests,
  }, dispatch)
}

export default auth(connect(mapStateToProps, mapDispatchToProps)(MyInterestsContainer))
