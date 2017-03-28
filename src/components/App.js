import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from './Dashboard'
import Login from './Login'
import PageNotFound from './PageNotFound'

import '../styles.globalcss'
import styles from './App.css'

class App extends Component {

  render() {
    return (
      <div>
        <header>
          <h2 className={styles.mainTitle}>Hello World!</h2>
        </header>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    )
  }
}

export default App
