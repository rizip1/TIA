import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'

import Interest from './visual/Interest'

class InterestsList extends Component {

  render() {
    const {interests} = this.props

    if (!interests) {
      return <p>Načítavam ...</p>
    } else if (!interests.length) {
      return <p>Nie sú vytvorené žiadne túry.</p>
    } else {
      return (
        <Row>
          <Col md={8}>
            {interests.map((i, key) => {
              return (
                <Interest {...i} {...this.props} key={key} />
              )
            })}
          </Col>
        </Row>
      )
    }
  }
}

export default InterestsList
