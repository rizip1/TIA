import React, { Component } from 'react'
import {Form, FormGroup, Button, FormControl} from 'react-bootstrap'

class LoginForm extends Component {
  render() {
    return (
      <div>
        <p>Prihlásenie</p>
      <Form inline>
        <FormGroup controlId="formInlineName">
          {' '}
          <FormControl type="email" placeholder="Email" />
        </FormGroup>
        {' '}
        <FormGroup controlId="formInlineEmail">
          {' '}
          <FormControl type="password" placeholder="Heslo" />
        </FormGroup>
        {' '}
        <Button type="submit">
          Prihlásiť
        </Button>
      </Form>
      </div>
    )
  }
}

export default LoginForm
