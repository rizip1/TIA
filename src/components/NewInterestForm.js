import React, { Component } from 'react'
import {Button, Row, Col} from 'react-bootstrap'
import {reduxForm, Field} from 'redux-form'
import moment from 'moment'

import {dateFormat} from './helpers'
import {locations, difficultyLevels} from '../common/enums'
import styles from './NewInterestForm.scss'

import CustomField from './visual/CustomField'

function validate(formProps) {
  const errors = {}

  const {locations} = formProps

  if (!locations || !locations.length) {
    errors.locations = true
  }

  return errors
}

class NewInterestForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      minMax: 1,
      maxMin: difficultyLevels.length,
      minLevels: difficultyLevels,
      maxLevels: difficultyLevels,
    }
  }

  componentDidMount() {
    const initData = {
      'minDifficulty': '1',
      'maxDifficulty': '5',
      'validTo': this.getInitValidTo(),
      'description': '',
      'locations': [],
    }
    this.props.initialize(initData)
  }

  handleDifficultyChange = (e) => {
    const {value, name} = e.target
    const diffLength = difficultyLevels.length
    if (name === 'minDifficulty') {
      const maxLevels = difficultyLevels.slice(-(diffLength - value + 1))
      this.setState({maxMin: value, maxLevels})
    } else {
      const minLevels = difficultyLevels.slice(0, value)
      this.setState({minMax: value, minLevels})
    }
  }

  handleSubmit = (values) => {
    console.log('values', values)
  }

  getInitValidTo = () => {
    return moment(new Date()).add(2, 'month').format(dateFormat)
  }

  render() {
    const {invalid, submitting, handleSubmit} = this.props
    const {minLevels, maxLevels} = this.state

    return (
      <Row>
        <Col md={6} mdOffset={3} className={styles.formBody}>
          <h2>Nová túra</h2>
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <Field
              name="validTo"
              label="Platnosť túry do:"
              component={CustomField}
              inputType="datePicker"
              defaultValue={this.getInitValidTo()}
            />
            <Field
              name="minDifficulty"
              label="Minimálna obtiažnosť"
              component={CustomField}
              onChange={this.handleDifficultyChange}
              options={minLevels}
              inputType="select"
            />
            <Field
              name="maxDifficulty"
              inputType="select"
              label="Maximálna obtiažnosť"
              component={CustomField}
              onChange={this.handleDifficultyChange}
              options={maxLevels}
            />
            <Field
              name="locations"
              label="Lokality"
              component={CustomField}
              options={locations}
              inputType="checkboxGroup"
              note="Vyberte aspoň jednu možnosť"
            />
            <Field
              name="description"
              label="Popis túry"
              inputType="textarea"
              component={CustomField}
            />
            <Button
              type="submit"
              disabled={submitting || invalid}>
              Vytvoriť túru
            </Button>
          </form>
        </Col>
      </Row>
    )
  }
}

export default reduxForm({
  form: 'new-interest',
  validate,
})(NewInterestForm)
