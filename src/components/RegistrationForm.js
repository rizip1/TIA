import React, { Component } from 'react'
import validator from 'validator'
import {Button} from 'react-bootstrap'
import {reduxForm, Field} from 'redux-form'

import FormSubmitFeedback from './visual/FormSubmitFeedback'
import CustomField from './visual/CustomField'
import styles from './RegistrationForm.scss'

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
    const {invalid, submitting, handleSubmit, submitSucceeded,
      submitFailed, error} = this.props

    return (
      <div className={styles.text}>
        <p>Ešte nemáš účet? Tak neváhaj a <strong>registruj sa.</strong></p>
        <form onSubmit={handleSubmit}>
          <Field
            name="login"
            type="text"
            placeholder="Používateľské meno"
            component={CustomField}
            showValidation
          />
          <Field
            name="email"
            type="email"
            placeholder="Email"
            component={CustomField}
            showValidation
          />
          <Field
            name="password"
            type="password"
            placeholder="Heslo"
            component={CustomField}
            showValidation
          />
          <Field
            name="passwordConfirm"
            type="password"
            placeholder="Potvrdenie hesla"
            component={CustomField}
            showValidation
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={submitting || invalid}>
            Registrovať
          </Button>
        </form>
        {submitSucceeded &&
          <FormSubmitFeedback>
            <strong>Ďakujeme za registráciu</strong>. Pre
             dokončenie registrácie prosím <strong>kliknite
             na link v potvrdzovacom emaily</strong>, ktorý sme zaslali na Vami
             zadanú emailovú adresu.</FormSubmitFeedback>
        }
        {(submitFailed && error) &&
          <FormSubmitFeedback>Pri registrácií sa vyskytla chyba. Prosím skontrolujte
            pripojenie k internetu a prípadne kontaktujte technickú podporu.
          </FormSubmitFeedback>
        }
        {submitting &&
          <FormSubmitFeedback>Prebieha registrácia prosím počkajte.</FormSubmitFeedback>
        }
      </div>
    )
  }
}

export default reduxForm({
  form: 'registration',
  validate,
})(RegistrationForm);
