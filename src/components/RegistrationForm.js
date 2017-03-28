import React, { Component } from 'react'
import {FormGroup, Button, FormControl} from 'react-bootstrap'

class RegistrationForm extends Component {
  render() {
    return (
      <div>
        <p>Ešte nemáš účet? Tak neváhaj a registruj sa.</p>
        <form>
          <FormGroup controlId="registerLogin">
            <FormControl type="text" placeholder="Používateľské meno" />
          </FormGroup>
          <FormGroup controlId="registerEmail">
            <FormControl type="email" placeholder="Email" />
          </FormGroup>
          <FormGroup controlId="registerPassword">
            <FormControl type="password" placeholder="Heslo" />
          </FormGroup>
          <FormGroup controlId="registerPasswordConfirm">
            <FormControl type="password" placeholder="Potvrdenie hesla" />
          </FormGroup>
          <Button type="submit">
            Registrovať
          </Button>
        </form>
      </div>
    )
  }
}

export default RegistrationForm
