import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'
import {reduxForm, Field} from 'redux-form'

import FormSubmitFeedback from './visual/FormSubmitFeedback'
import CustomField from './visual/CustomField'
import styles from './LoginForm.scss'

function validate(formProps) {
  const errors = {}

  const {email, password} = formProps

  if (!email || !email.trim().length) {
    errors.email = true
  }

  if (!password || !password.trim().length) {
    errors.password = true
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
    const {invalid, submitting, handleSubmit,
      submitFailed, error} = this.props

    return (
      <div className={styles.text}>
        <p><strong>Prihlásenie</strong></p>
      <Form inline onSubmit={handleSubmit}>
        <Field
          name="email"
          type="text"
          placeholder="Email"
          showErrors={false}
          ignoreLabel
          component={CustomField}
        />
        {' '}
        <Field
          name="password"
          type="password"
          placeholder="Heslo"
          showErrors={false}
          ignoreLabel
          component={CustomField}
        />
        {' '}
        <Button type="submit" onClick={handleSubmit} disabled={submitting || invalid}>
          Prihlásiť
        </Button>
      </Form>
        {(submitFailed && !error) &&
          <FormSubmitFeedback type="error">
            Nesprávne prihlasovacie údaje
          </FormSubmitFeedback>
        }
        {(submitFailed && error) &&
          <FormSubmitFeedback type="error">
            Pri prihlásení sa vyskytla chyba. Prosím skontrolujte
            pripojenie k internetu a prípadne kontaktujte technickú podporu.
          </FormSubmitFeedback>
        }
      </div>
    )
  }
}

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
