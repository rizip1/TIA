import React, {Component} from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import {Grid} from 'react-bootstrap'

import Dashboard from './Dashboard'
import MainPageContainer from '../containers/MainPageContainer'
import PageNotFound from './PageNotFound'
import NavigationContainer from '../containers/NavigationContainer'
import LogoutContainer from '../containers/LogoutContainer'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavigationContainer />
          <Grid>
            <Switch>
              <Route exact path="/" component={MainPageContainer}/>
              <Route exact path="/logout" component={LogoutContainer}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route component={PageNotFound}/>
            </Switch>
          </Grid>
        </div>
      </Router>
    )
  }
}

export default App
