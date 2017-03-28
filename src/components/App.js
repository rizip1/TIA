import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Grid} from 'react-bootstrap'

import Dashboard from './Dashboard'
import MainPage from './MainPage'
import PageNotFound from './PageNotFound'
import Navigation from './Navigation'

class App extends Component {

  render() {
    return (
      <div>
        <Navigation />
        <Grid>
          <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route component={PageNotFound}/>
          </Switch>
        </Grid>
      </div>
    )
  }
}

export default App
