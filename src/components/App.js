import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Grid} from 'react-bootstrap'

import Dashboard from './Dashboard'
import MainPageContainer from '../containers/MainPageContainer'
import PageNotFound from './PageNotFound'
import Navigation from './Navigation'
import auth from './hoc/auth'

class App extends Component {

  render() {
    return (
      <div>
        <Navigation />
        <Grid>
          <Switch>
            <Route exact path="/" component={MainPageContainer}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route component={PageNotFound}/>
          </Switch>
        </Grid>
      </div>
    )
  }
}

export default auth(App)
