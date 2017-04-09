import React, {Component, PropTypes} from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import {Grid} from 'react-bootstrap'
import NotificationSystem from 'react-notification-system'

import Dashboard from './Dashboard'
import MainPageContainer from '../containers/MainPageContainer'
import PageNotFound from './PageNotFound'
import NavigationContainer from '../containers/NavigationContainer'
import LogoutContainer from '../containers/LogoutContainer'
import CreateInterestContainer from '../containers/CreateInterestContainer'
import MyInterestsContainer from '../containers/MyInterestsContainer'

class App extends Component {

  constructor(props) {
    super(props)
    this.notificationSystem = null
  }

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem
  }

  addNotification = (message, level = 'success') => {
    this.notificationSystem.addNotification({
      message,
      level,
      position: 'br',
    })
  }

  getChildContext() {
    return {addNotification: this.addNotification}
  }

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
              <Route path="/new-interest" component={CreateInterestContainer}/>
              <Route path="/my-interests" component={MyInterestsContainer}/>
              <Route component={PageNotFound}/>
            </Switch>
          </Grid>
          <NotificationSystem ref="notificationSystem" />
        </div>
      </Router>
    )
  }
}

App.childContextTypes = {
  addNotification: PropTypes.func,
}

export default App
