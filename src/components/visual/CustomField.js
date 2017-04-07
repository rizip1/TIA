import React, {Component} from 'react'
import {FormGroup, ControlLabel, Checkbox, FormControl, Label,
  HelpBlock} from 'react-bootstrap'
import DateTime from 'react-datetime'
import moment from 'moment'

import {dateFormat} from '../helpers'


export default class CustomField extends Component {

  getValidationState = () => {
    const {showValidation, meta: {touched, error}} = this.props
    if (!showValidation) {
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

  renderComponent = () => {
    const {inputType} = this.props

    if (inputType === 'checkbox') {
      return this.renderCheckBox()
    } else if (inputType === 'checkboxGroup') {
      return this.renderCheckboxGroup()
    } else if (inputType === 'textarea') {
      return this.renderTextArea()
    } else if (inputType === 'select') {
      return this.renderSelect()
    } else if (inputType === 'datePicker') {
      return this.renderDatePicker()
    } else {
      return this.renderInput()
    }
  }

  renderDatePicker = () => {
    const max = moment(new Date()).add(2, 'months' )
    const min = moment(new Date()).subtract(1, 'day')
    const valid = function( current ){
      return current.isBefore(max) && current.isAfter(min)
    }


    const {input, defaultValue} = this.props
    return (
      <DateTime
        dateFormat={dateFormat}
        value={input.value}
        defaultValue={defaultValue}
        timeFormat={false}
        closeOnSelect
        isValidDate={valid}
        onChange={(param) => input.onChange(param.format(dateFormat))}
      />
    )
  }

  renderCheckBox = () => {
    const {input, label} = this.props
    return (
      <Checkbox {...input}>{label}</Checkbox>
    )
  }

  renderTextArea = () => {
    const {input, placeholder} = this.props
    return (
      <FormControl {...input} componentClass="textarea" placeholder={placeholder} />
    )
  }

  renderInput = () => {
    const {input, type, maxLength, placeholder} = this.props
    return (
      <FormControl {...input}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength || 40}
        componentClass="input"
      />
    )
  }

  renderCheckboxGroup = () => {
    const {label, name, options, input} = this.props

    return (
      options.map((option, index) => (
        <div className="checkbox" key={index}>
          <label>
            <input type="checkbox"
                   name={name}
                   value={option.name}
                   checked={input.value.includes(option.name)}
                   onChange={event => {
                     const newValue = [...input.value]
                     if(event.target.checked) {
                       newValue.push(option.name)
                     } else {
                       newValue.splice(newValue.indexOf(option.name), 1)
                     }
                     return input.onChange(newValue)
                   }}/>
            {option.label}
          </label>
        </div>))
    )
  }

  renderSelect = () => {
    const {input, multiple, options} = this.props
    return (
      <FormControl {...input}
        componentClass="select"
        multiple={multiple}
      >
        {
          options && options.map((option, index) => {
            return (<option key={index} value={option.name}>{option.label}</option>)
          })
        }
      </FormControl>
    )
  }

  render() {
    const {inputType, checkboxGroup, label, showValidation, note,
      meta: {touched, error}} = this.props

    if (inputType === 'checkbox' && checkboxGroup) {
      return this.renderCheckBox()
    }

    return (
      <FormGroup validationState={this.getValidationState()}>
        <ControlLabel>
          {label} {note && <Label bsStyle="info">{note}</Label>}
        </ControlLabel>
        {this.renderComponent()}
        {(showValidation && touched && error) && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
    )
  }
}
