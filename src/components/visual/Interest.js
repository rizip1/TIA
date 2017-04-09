import React, {Component} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import moment from 'moment'

import {locations as locationsEnums} from '../../common/enums'
import styles from './Interest.scss'
import {dateFormat} from '../../common/utils'

class Interest extends Component {

  render() {
    console.log('creatorId', this.props.creatorId, this.props.userId)
    const {createdAt, validTo, creatorLogin, minDifficulty,
      creatorId, maxDifficulty, description, locations, userId} = this.props
    return (
      <Row className={styles.wrapper}>
        <Row>
          <Col md={6}>
            <strong>Vytvorené: </strong>{moment(createdAt).format(dateFormat)}
          </Col>
          <Col md={6} className={styles.validTo}>
            Platí do: <strong>{moment(validTo).format(dateFormat)}</strong>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p><strong>Autor:</strong> {creatorLogin} <br></br>
            <strong>Obtiažnosť:</strong> {minDifficulty}-{maxDifficulty}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p><strong>Lokality: </strong>
              {locations.map((l) => {
                const item = locationsEnums.find((item) => item.name === l.name)
                return `${item.label},  `
              })}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p><strong>Popis: </strong>
            {description || 'K túre zatiaľ nie je žiadny popis.'}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {creatorId !== userId && (
              <Button type="button">
                Pripojiť sa
              </Button>
            )}
            {creatorId === userId && (
              <Button type="button">
                Zmazať
              </Button>
            )}
          </Col>
        </Row>
      </Row>
    )
  }
}

export default Interest
