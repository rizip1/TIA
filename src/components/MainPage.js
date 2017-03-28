import React, {Component} from 'react'
import {Row, Col, Jumbotron} from 'react-bootstrap'

import LoginForm from './LoginForm'
import RegistraionForm from './RegistrationForm'
import styles from './MainPage.scss'

class MainPage extends Component {

  render() {
    return (
      <div>
        <Row>
          <Col md={6}>
            <Jumbotron className={styles.jumbo}>
              <h1>Hiker</h1>
              <p>Rád chodíš na hory no nemáš s kým?</p>
              <p>Je tažké zladiť turistiku medzi viacerými ludmi?</p>
              <p><strong>Hiker</strong> ti pomôže nájsť ľudí s podobnými cieľmi ako ty,
              či zladiť túru do posledného detailu.
              </p>
            </Jumbotron>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={12} className={styles.loginForm}>
                <LoginForm />
              </Col>
              <Col md={12} className={styles.registrationForm}>
                <RegistraionForm />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MainPage
