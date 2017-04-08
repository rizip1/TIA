import React, {Component} from 'react'
import {Button, Row, Col} from 'react-bootstrap'
import {reduxForm, Field} from 'redux-form'

import styles from './CreateInterestForm.scss'
import CustomField from './visual/CustomField'

function validate(formProps) {
  const errors = {}

  const {locations} = formProps

  if (!locations || !locations.length) {
    errors.locations = true
  }

  return errors
}

class CreateInterestForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      minMax: 1,
      maxMin: props.difficultyLevels.length,
      minLevels: props.difficultyLevels,
      maxLevels: props.difficultyLevels,
    }
  }

  componentDidMount() {
    const {difficultyLevels, getInitValidTo} = this.props
    const initData = {
      'minDifficulty': '1',
      'maxDifficulty': difficultyLevels.length.toString(),
      'validTo': getInitValidTo(),
      'description': '',
      'locations': [],
    }
    this.props.initialize(initData)
  }

  handleDifficultyChange = (e) => {
    const {difficultyLevels} = this.props
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

  render() {
    const {invalid, submitting, handleSubmit, locations,
      handleSubmitCustom, getInitValidTo} = this.props
    const {minLevels, maxLevels} = this.state

    return (
      <Row>
        <Col md={6} mdOffset={3} className={styles.formBody}>
          <h2>Nová túra</h2>
          <form onSubmit={handleSubmit(handleSubmitCustom)}>
            <Field
              name="validTo"
              label="Platnosť túry do:"
              component={CustomField}
              inputType="datePicker"
              defaultValue={getInitValidTo()}
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
})(CreateInterestForm)
