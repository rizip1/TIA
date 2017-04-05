import React from 'react'
import {FormGroup, FormControl, HelpBlock, ControlLabel, Checkbox} from 'react-bootstrap'

export const dateFormat = 'YYYY-MM-DD'

export const renderField = ({input, placeholder, type, inputType, showErrors = true,
  options, ignoreLabel = false, multiple = false, meta: {touched, error}}) => {
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

  if (inputType === 'checkbox') {
    return (
      <FormGroup>
        {!ignoreLabel && <ControlLabel>{placeholder}</ControlLabel>}
        {
          options && inputType === 'checkbox' && Object.keys(options).map((key, index) => {
            return (
              <Checkbox {...input} key={index} name={key}>
                {options[key]}
              </Checkbox>
            )
          })
        }
      </FormGroup>
    )
  } else {
    return (
      <FormGroup validationState={getValidationState()}>
        {' '}
        {!ignoreLabel && <ControlLabel>{placeholder}</ControlLabel>}
        <FormControl {...input}
          placeholder={placeholder}
          type={type}
          maxLength={40}
          componentClass={inputType || 'input'}
          multiple={multiple}
        >
          {
            options && inputType === 'select' && Object.keys(options).map((key, index) => {
              return (<option key={index} value={key}>{options[key]}</option>)
            })
          }
        </FormControl>
        {showErrors && <FormControl.Feedback />}
        {(showErrors && touched && error) && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
    )
  }
}

