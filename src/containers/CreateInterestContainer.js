import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'

import {dateFormat} from '../common/utils'
import {createInterest} from '../actions/interests'
import {locations, difficultyLevels} from '../common/enums'
import CreateInterestForm from '../components/CreateInterestForm'
import auth from '../components/hoc/auth'


class CreateInterestContainer extends Component {

  static contextTypes = {
    addNotification: PropTypes.func,
  }

  handleSubmit = (values) => {
    const {createInterest, history} = this.props
    createInterest(values)
      .then(() => {
        this.context.addNotification('Túra bola úspešne vytvorená')
        history.push('/my-interests')
      })
      .catch((err) => console.error('Error creating interest', err))
  }

  getInitValidTo = () => {
    return moment(new Date()).add(2, 'month').format(dateFormat)
  }

  render() {
    return (
      <CreateInterestForm
        difficultyLevels={difficultyLevels}
        locations={locations}
        addNotification={this.context.addNotification}
        getInitValidTo={this.getInitValidTo}
        handleSubmitCustom={this.handleSubmit}
        {...this.props}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createInterest,
  }, dispatch)
}

export default auth(withRouter(connect(null, mapDispatchToProps)(CreateInterestContainer)))
