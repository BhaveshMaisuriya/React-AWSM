import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { initWebsocket, sendMessage } from './SocketService' // ?? why use websocket ?? :D ??

// Import Routes
import { authProtectedRoutes, publicRoutes } from './routes/'
import AppRoute from './routes/route'

// layouts
import VerticalLayout from './components/VerticalLayout/'
import HorizontalLayout from './components/HorizontalLayout/'
import NonAuthLayout from './components/NonAuthLayout'

// Import scss
import './assets/scss/theme.scss'

// Import fackbackend Configuration file
// import fakeBackend from './helpers/AuthType/fakeBackend'

// Activating fake backend
// fakeBackend()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginState: sessionStorage.getItem('loginState'),
      accessToken: sessionStorage.getItem('graphAccessToken'),
    }
    this.getLayout = this.getLayout.bind(this)

    document.addEventListener('click', e => {
      if (
        e.path.findIndex(
          s => s.classList && s.classList.contains('chart-column-filter')
        ) === -1
      )
        // for (const path of e.path) {
        //   const $bigParent = e.path[0]
        //   if (!$bigParent.id.includes('-chart-tooltip-'))
        document
          .querySelectorAll('[id*="-chart-tooltip-"]')
          .forEach($el => $el.classList.add('hide'))
      // }
    })
  }

  /**
   * Returns the layout
   */
  getLayout = () => {
    let layoutCls = VerticalLayout

    switch (this.props.layout.layoutType) {
      case 'horizontal':
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  componentDidMount() {
    // initWebsocket()
  }

  render() {
    const Layout = this.getLayout()
    return (
      <React.Fragment>
        <Router>
          <Switch>
            {publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={Layout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                exact
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

App.propTypes = {
  layout: PropTypes.object,
}

export default connect(mapStateToProps, null)(App)
