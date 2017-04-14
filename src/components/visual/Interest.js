import React, {Component} from 'react'
import {Row, Col, Button, Panel, Badge, Label} from 'react-bootstrap'
import moment from 'moment'

import {locations as locationsEnums} from '../../common/enums'
import styles from './Interest.scss'
import {dateFormatHuman} from '../../common/utils'


class Interest extends Component {

  getPanelHeader = () => {
    const {createdAt, validTo, creatorLogin} = this.props
    return (
      <Row>
        <Col md={6}>
          <strong>{creatorLogin}: </strong>{moment(createdAt).format(dateFormatHuman)}
        </Col>
        <Col md={6} className={styles.validTo}>
          Platí do: <strong>{moment(validTo).format(dateFormatHuman)}</strong>
        </Col>
    </Row>
    )
  }

  getPanelFooter = () => {
    const {creatorId, userId, users, id, userLogin, assignToInterest,
      unassignFromInterest, onDelete, my} = this.props
    return (
      <Row>
        <Col smPush={10} sm={2}>
          {(creatorId !== userId && !users.includes(userLogin)) && (
            <Button type="button" onClick={() => assignToInterest(id)}>
              Pridať sa
            </Button>
          )}
          {(creatorId !== userId && users.includes(userLogin)) && (
            <Button bsStyle="danger" type="button" onClick={() => unassignFromInterest(id)}>
              Opustiť
            </Button>
          )}
          {(creatorId === userId && my) && (
            <Button bsStyle="danger" type="button" onClick={() => onDelete(id)}>
              Zmazať
            </Button>
          )}
        </Col>
      </Row>
    )
  }

  render() {
    const {minDifficulty, maxDifficulty, description, locations, users} = this.props

    return (
      <Panel
        className={styles.wrapper}
        header={this.getPanelHeader()}
        footer={this.getPanelFooter()}
      >
        <Row>
          <Col md={12}>
            <p><Badge className={styles.difficulty}>{minDifficulty}/{maxDifficulty}</Badge>
              {locations.map((l, key) => {
                const item = locationsEnums.find((item) => item.name === l.name)
                return (
                  <Label key={key} className={styles.location} bsStyle="default">
                    {item.label}
                  </Label>
                )
              })}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className={styles.text}><strong>Popis: </strong>
            {description || 'K túre zatiaľ nie je žiadny popis.'}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className={styles.text}><strong>Prihlásení: </strong>
            {users.length ? users.map((u) => `${u} `)
              : 'Zatiaľ nie je prihlásený žiadny užívateľ.'}
            </p>
          </Col>
        </Row>
      </Panel>
    )
  }
}

export default Interest
