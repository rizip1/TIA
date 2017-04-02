import React from 'react'
import {FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap'

export const renderField = ({input, placeholder, type, showErrors = true,
  ignoreLabel = false, meta: {touched, error}}) => {
  const getValidationState = () => {
    if (!showErrors) {
      return null
    }
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
      {!ignoreLabel && <ControlLabel>{placeholder}</ControlLabel>}
      <FormControl {...input}
        placeholder={placeholder}
        type={type}
        maxLength={40}
      />
      {showErrors && <FormControl.Feedback />}
      {(showErrors && touched && error) && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  )
}
