import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'

class ConfirmModal extends Component {
  render() {
    const {show, onHide, onConfirm, body, confirmText} = this.props
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Potvrdenie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{body}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Zrušiť</Button>
          <Button onClick={onConfirm} bsStyle="danger">{confirmText}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ConfirmModal
