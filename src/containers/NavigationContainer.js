import {connect} from 'react-redux'

import Navigation from '../components/Navigation'

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps, null)(Navigation)
