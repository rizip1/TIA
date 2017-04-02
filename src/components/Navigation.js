import React, { Component } from 'react'
import {Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import styles from './Navigation.scss'

class Navigation extends Component {
  render() {
    const {isAuthenticated} = this.props
    const brandLink = isAuthenticated ? '/dashboard' : '/'

    return (
      <Navbar className={styles.navigation}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link className={styles.linkHeader} to={brandLink}>Hiker</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {isAuthenticated &&
          <Navbar.Collapse>
            <Navbar.Text>
              <Link className={styles.linkHeader} to="/my-interests">Moje túry</Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link className={styles.linkHeader} to="/new-interest">Nová túra</Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link className={styles.linkHeader} to="/profile">Profil</Link>
            </Navbar.Text>
            <Navbar.Text className={styles.profileOptions}>
              <Link className={styles.linkHeader} to="/logout">Odhlásiť</Link>
            </Navbar.Text>
          </Navbar.Collapse>
        }
      </Navbar>
    )
  }
}

export default Navigation
