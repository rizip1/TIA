import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap'

import styles from './PageNotFound.scss'

class PageNotFound extends Component {

  render() {
    return (
      <Jumbotron className={styles.jumbo}>
        <h1>Ouups!</h1>
        <p>Hľadaný cieľ neexistuje</p>
      </Jumbotron>
    )
  }
}

export default PageNotFound
