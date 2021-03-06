import React, {Component, PropTypes} from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import {Grid} from 'react-bootstrap'
import NotificationSystem from 'react-notification-system'

import DashboardContainer from '../containers/DashboardContainer'
import MainPageContainer from '../containers/MainPageContainer'
import PageNotFound from './PageNotFound'
import NavigationContainer from '../containers/NavigationContainer'
import LogoutContainer from '../containers/LogoutContainer'
import CreateInterestContainer from '../containers/CreateInterestContainer'
import MyInterestsContainer from '../containers/MyInterestsContainer'

class App extends Component {

  static childContextTypes = {
    addNotification: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.notificationSystem = null
  }

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem
  }

  addNotification = (message, level = 'info') => {
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

    const {isAuthenticated} = this.props

    if (isAuthenticated) {
      document.body.style.background = 'none'
      document.body.style.backgroundColor = '#F2F8F4'
    } else {
      document.body.style.background = 'none'
      document.body.style.backgroundImage = 'url("/public/background.jpg")'
      document.body.style.backgroundRepeat = 'no-repeat'
      document.body.style.backgroundSize = 'cover'
    }

    return (
      <Router>
        <div>
          <NavigationContainer />
          <Grid>
            <Switch>
              <Route exact path="/" component={MainPageContainer}/>
              <Route exact path="/logout" component={LogoutContainer}/>
              <Route path="/dashboard" component={DashboardContainer}/>
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

export default App
