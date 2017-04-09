import React, {Component} from 'react'
import {Modal} from 'react-bootstrap'

class ConfirmModal extends Component {
  render() {
    const {show, onHide, onConfirm} = this.props
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Text in a modal</h4>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ConfirmModal
