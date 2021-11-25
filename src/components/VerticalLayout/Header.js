import PropTypes from "prop-types"
import React, { Component } from "react"

import { connect } from "react-redux"

// Import menuDropdown
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"
import awsmLogo from "../../assets/images/AWSM-logo.png"

//i18n
import { withTranslation } from "react-i18next"

// Redux Store
import { toggleRightSidebar } from "../../store/actions"
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearch: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.toggleRightbar = this.toggleRightbar.bind(this)
    this.toggleFullscreen = this.toggleFullscreen.bind(this)
  }
  /**
   * Toggle sidebar
   */
  toggleMenu() {
    this.props.toggleMenuCallback()
  }

  /**
   * Toggles the sidebar
   */
  toggleRightbar() {
    this.props.toggleRightSidebar()
  }

  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        {window.location.pathname !== "/orderbank" && (
          <header id="page-topbar" style={{ boxShadow: "none !important" }}>
            <div className="navbar-header">
              <div className="navbar-brand-box" style={{ padding: 0 }}>
                <div className="sideBar_profile">
                  <ProfileMenu sidebar={true} />
                </div>
              </div>
              <div className="navbar-text page-header">
                Data Quality Management
              </div>
              <img
                src={awsmLogo}
                alt="AWSM Logo"
                className="vertical-hr-left"
              />
            </div>
          </header>
        )}
        {window.location.pathname === "/orderbank" && (
          <div className="navbar-brand-box position-fixed" style={{ padding: 0 }}>
            <div className="sideBar_profile">
              <ProfileMenu sidebar={true} />
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

const mapStatetoProps = state => {
  const { layoutType } = state.Layout
  return { layoutType }
}

export default connect(mapStatetoProps, { toggleRightSidebar })(
  withTranslation()(Header)
)

Header.propTypes = {
  t: PropTypes.any,
  toggleMenuCallback: PropTypes.any,
  toggleRightSidebar: PropTypes.func,
}
