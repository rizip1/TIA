import React, { Component } from 'react'
import {FormGroup, Button, FormControl} from 'react-bootstrap'

import { reduxForm, Field } from 'redux-form'

const renderField = (field) => {
  return (
    <FormGroup>
      {' '}
      <FormControl {...field.input}
        placeholder={field.placeholder}
        type={field.type}
      />
    </FormGroup>
  )
}

function validate(formProps) {
  const errors = {};

  const {login, email, password, passwordConfirm} = formProps

  if (!login|| !login.trim().length) {
    errors.login = 'a'
  }

  if (!email || !email.trim().length) {
    errors.email = 'a'
  }

  if (!password || !password.trim().length) {
    errors.password = 'a'
  }

  if (!passwordConfirm || !passwordConfirm.trim().length) {
    errors.passwordConfirm = 'a'
  }

  return errors;
}

class RegistrationForm extends Component {

  componentDidMount() {
    const initData = {
      'login': '',
      'email': '',
      'password': '',
      'passwordConfirm': '',
    }

    this.props.initialize(initData);
  }

  render() {
    const {invalid, submitting, handleSubmit} = this.props

    return (
      <div>
        <p>Ešte nemáš účet? Tak neváhaj a registruj sa.</p>
        <form>
          <Field
            name="login"
            type="text"
            placeholder="Používateľské meno"
            component={renderField}
          />
          <Field
            name="email"
            type="email"
            placeholder="Email"
            component={renderField}
          />
          <Field
            name="password"
            type="password"
            placeholder="Heslo"
            component={renderField}
          />
          <Field
            name="passwordConfirm"
            type="password"
            placeholder="Potvrdenie hesla"
            component={renderField}
          />
          <Button type="submit" onClick={handleSubmit} disabled={submitting || invalid}>
            Registrovať
          </Button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'registration',
  validate,
})(RegistrationForm);
