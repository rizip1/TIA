import React, {Component} from 'react'
import {Row, Col, Jumbotron} from 'react-bootstrap'

import LoginForm from './LoginForm'
import RegistraionForm from './RegistrationForm'
import styles from './MainPage.scss'

class MainPage extends Component {

  render() {
    const {handleSubmitLogin, handleSubmitRegister} = this.props

    return (
      <div>
        <Row>
          <Col md={6}>
            <Jumbotron className={styles.jumbo}>
              <h1 className={styles.header}>Hiker</h1>
              <p>Rád chodíš na hory no nemáš s kým?</p>
              <p>Je tažké zladiť turistiku medzi viacerými ľuďmi?</p>
              <p><strong>Hiker</strong> ti pomôže nájsť ľudí s podobnými cieľmi ako ty,
              či zladiť túru do posledného detailu.
              </p>
            </Jumbotron>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={12} className={styles.loginForm}>
                <LoginForm onSubmit={handleSubmitLogin} />
              </Col>
              <Col md={12} className={styles.registrationForm}>
                <RegistraionForm onSubmit={handleSubmitRegister} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MainPage
