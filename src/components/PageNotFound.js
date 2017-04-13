import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap'

import styles from './PageNotFound.scss'

class PageNotFound extends Component {

  render() {
    return (
      <Jumbotron className={styles.jumbo}>
        <h1 className={styles.text}>Ouups!</h1>
        <p className={styles.text}>Hľadaný cieľ neexistuje</p>
      </Jumbotron>
    )
  }
}

export default PageNotFound
