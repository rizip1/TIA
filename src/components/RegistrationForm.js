import React, { Component } from 'react'
import validator from 'validator'
import {FormGroup, Button, FormControl, HelpBlock} from 'react-bootstrap'

import { reduxForm, Field } from 'redux-form'

const renderField = ({input, placeholder, type, meta: {touched, error}}) => {
  const getValidationState = () => {
    if (touched && error) {
      return 'error'
    } else if (touched) {
      return 'success'
    } else {
      return null
    }
  }
  return (
    <FormGroup validationState={getValidationState()}>
      {' '}
      <FormControl {...input}
        placeholder={placeholder}
        type={type}
        maxLength={40}
      />
      <FormControl.Feedback />
      {(touched && error) && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  )
}

function validate(formProps) {
  const errors = {}
  const empty = 'Pole nesmie byť prázdne'

  const trimmedProps = {}
  Object.keys(formProps).forEach((key) => {
    trimmedProps[key] = formProps[key] ? formProps[key].trim() : null
  })
  const {login, email, password, passwordConfirm} = trimmedProps

  if (!login) {
    errors.login = empty
  }

  if (!email) {
    errors.email = empty
  } else if (!validator.isEmail(email)) {
    errors.email = 'Neplatný email'
  }

  if (!password) {
    errors.password = empty
  } else if (!validator.isLength(password, {min:6})) {
    errors.password = 'Heslo musí obsahovať aspoň 6 znakov'
  }

  if (password && passwordConfirm && password !== passwordConfirm) {
    errors.passwordConfirm = 'Heslá sa nezhodujú'
  }

  return errors
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
