import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import { withRouter, Link } from "react-router-dom"
import { getUserProperties, getUserImage } from "store/actions"
import { userNameMapping, userUPNMapping } from "../../../common/data/userMapping";
import { signOut } from "../../../AuthService";

//i18n
import { withTranslation } from "react-i18next"

// users
import defaultAvatar from "../../../assets/images/users/avatar-default.png"


class ProfileMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      name: "AWSM User",
      userAvatar: "",
      userUPN: this.upnFormatter(sessionStorage.getItem('userEmail')),
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu,
    }))
  }

  componentDidMount() {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        this.setState({ name: obj.displayName })
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        this.setState({ name: obj.username })
      }
    }

    const { onGetUserProperties, onGetUserImage } = this.props
    onGetUserProperties()
    onGetUserImage(this.state.userUPN)
  }

  nameFormatter(userProperties) {
    var domainBank = ["pethlab", "pethstag", "dev.petronas", "stag.petronas"];
    var testAccount = false;
    var fullName = "";

    domainBank.forEach(domain => {
      if (userProperties.mail.toLowerCase().includes(domain)) {
        testAccount = true;
      }
    })

    if (testAccount == false) {
      var charIndex = userProperties.displayName.indexOf('(', 0);
      fullName = userProperties.displayName.substring(0, charIndex - 1);
    }
    else {
      fullName = userNameMapping[userProperties.mail.toLowerCase()] || "AWSM User"
    }

    return fullName;
  }

  upnFormatter(userEmail) {
    if (userEmail != null) {
      var domainBank = ["pethlab", "pethstag", "dev.petronas", "stag.petronas"];
      var testAccount = false;
      var userUPN = "";

      domainBank.forEach(domain => {
        if (userEmail.toLowerCase().includes(domain)) {
          testAccount = true;
        }
      })

      if (testAccount == false) {
        userUPN = sessionStorage.getItem('userUPN')
      }
      else {
        userUPN = userUPNMapping[sessionStorage.getItem('userUPN')] || "imageNotFound"
      }
      return userUPN;
    }


  }

  renderImage(userImage) {
    let reader = new FileReader();
    reader.readAsDataURL(userImage.data);

    reader.onload = function () {
      this.setState({ userAvatar: reader.result })
    }.bind(this)

  }

  render() {
    const { userProperties, userImage } = this.props

    if (!userImage || userImage.length === 0) {
    }
    else {
      this.renderImage(userImage);
    }

    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="d-inline-block"
        >
          <DropdownToggle
            className="btn header-item waves-effect"
            id="page-header-user-dropdown"
            tag="button"
          >

            {!userImage || userImage.length === 0 || this.state.userUPN == "imageNotFound" ?
              <img
                className="rounded-circle header-profile-user"
                src={defaultAvatar}
                alt="Header Avatar"
              />
              :
              <img
                className="rounded-circle header-profile-user"
                src={this.state.userAvatar}
                alt="Header Avatar"
              />
            }
            {this.props.sidebar === false && <Fragment>
              <span className="d-none d-xl-inline-block ml-2 mr-1">
                {!userProperties || userProperties.length === 0 ? this.state.name : this.nameFormatter(userProperties)}
              </span>
              <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
            </Fragment>}
          </DropdownToggle>
          <DropdownMenu left="true">
            {/* <DropdownItem tag="a" href="/profile">
              <i className="bx bx-user font-size-16 align-middle mr-1" />
              {this.props.t("Profile")}
            </DropdownItem>
            <DropdownItem tag="a" href="#">
              <span className="badge badge-success float-right mt-1">5</span>
              <i className="bx bx-wrench font-size-17 align-middle mr-1" />
              {this.props.t("Settings")}
            </DropdownItem>
            <DropdownItem tag="a" href="auth-lock-screen">
              <i className="bx bx-lock-open font-size-16 align-middle mr-1" />
              {this.props.t("Lock screen")}
            </DropdownItem>
            <div className="dropdown-divider" />
             <Link to="/logout" className="dropdown-item">
              <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" />
              <span>{this.props.t("Logout")}</span>
            </Link>  */}
            <Link to={window.location.href} className="dropdown-item" onClick={signOut}>
              <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" />
              <span>{this.props.t("Logout")}</span>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    )
  }
}

ProfileMenu.propTypes = {
  t: PropTypes.any,
}

const mapStateToProps = ({ msGraph }) =>
({
  userProperties: msGraph.userProperties,
  userImage: msGraph.userImage,
})

const mapDispatchToProps = dispatch => ({
  onGetUserProperties: () => dispatch(getUserProperties()),
  onGetUserImage: params => dispatch(getUserImage(params)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(ProfileMenu)))
