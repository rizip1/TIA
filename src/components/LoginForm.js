import React, { Component } from 'react'
import {Form, FormGroup, Button, FormControl} from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'

const renderField = (field) => {
  return (
    <FormGroup>
      <FormControl {...field.input}
        placeholder={field.placeholder}
        type={field.type}
      />
    </FormGroup>
  )
}

function validate(formProps) {
  const errors = {};

  const {email, password} = formProps

  if (!email || !email.trim().length) {
    errors.email = 'a'
  }

  if (!password || !password.trim().length) {
    errors.password = 'a'
  }

  return errors
}

class LoginForm extends Component {

  componentDidMount() {
    const initData = {
      'email': '',
      'password': '',
    }

    this.props.initialize(initData);
  }

  render() {
    const {invalid, submitting, handleSubmit} = this.props

    return (
      <div>
        <p>Prihlásenie</p>
      <Form inline onSubmit={handleSubmit}>
        <Field
          name="email"
          type="text"
          placeholder="Email"
          component={renderField}
        />
        {' '}
        <Field
          name="password"
          type="password"
          placeholder="Heslo"
          component={renderField}
        />
        {' '}
        <Button type="submit" onClick={handleSubmit} disabled={submitting || invalid}>
          Prihlásiť
        </Button>
      </Form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
