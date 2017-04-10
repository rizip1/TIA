import React, {Component} from 'react'

import Dashboard from './Dashboard'
import ConfirmModal from './visual/ConfirmModal'

class MyInterests extends Component {

  constructor(props) {
    super(props)

    this.state = {showModal: false, interestIdToDelete: null}
  }

  onHide = () => {
    this.setState({showModal: false, interestIdToDelete: null})
  }

  showModal = (id) => {
    this.setState({showModal: true, interestIdToDelete: id})
  }

  render() {
    const {showModal, interestIdToDelete} = this.state
    const {deleteInterest, addNotification} = this.props
    return (
      <div>
        <Dashboard {...this.props} my={true} onDelete={(id) => this.showModal(id)} />
        <ConfirmModal
          show={showModal}
          onHide={this.onHide}
          body="Naozaj si prajete zmazať vybratú túru?"
          confirmText="Zmazať"
          onConfirm={() => {
            deleteInterest(interestIdToDelete)
            addNotification('Túra bola úspešne zmazaná.')
            this.onHide()
          }}
        />
      </div>
    )
  }
}

export default MyInterests
