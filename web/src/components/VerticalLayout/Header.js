
import { connect } from "react-redux"

import { Link } from "react-router-dom"

// Reactstrap
import { Dropdown } from "reactstrap"

// Import menuDropdown
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

import logoSm from "../../assets/images/logo-sm.png"
import logoDark from "../../assets/images/logo-dark.png"
import logoLight from "../../assets/images/logo-light.png"

// Redux Store
// import // showRightSidebarAction,
// toggleLeftmenu,
// changeSidebarType,
// "../../store/actions"

const Header = () => {
  function toggleFullscreen() {
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
    } else if (document.cancelFullScreen) {
      document.cancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    }
  }

  function tToggle() {
    const { body } = document
    const windowSize = document.documentElement.clientWidth

    body.classList.toggle("vertical-collpsed")
    body.classList.toggle("sidebar-enable")
    if (windowSize > 991) {
      body.getAttribute("data-sidebar-size") === "sm" && windowSize > 991
        ? body.setAttribute("data-sidebar-size", "lg")
        : body.setAttribute("data-sidebar-size", "sm")
    }
  }
  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <Link to="/" className="logo logo-dark">
              <span className="logo-sm">
                <img src={logoSm} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={logoDark} alt="" height="20" />
              </span>
            </Link>

            <Link to="/" className="logo logo-light">
              <span className="logo-sm">
                <img src={logoSm} alt="" height="22" />
              </span>
              <span className="logo-lg">
                <img src={logoLight} alt="" height="20" />
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => {
              tToggle()
            }}
            className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
            id="vertical-menu-btn"
          >
            <i className="fa fa-fw fa-bars" />
          </button>
        </div>

        <div className="d-flex">
          <Dropdown className="d-none d-lg-inline-block ms-1">
            <button
              type="button"
              onClick={() => {
                toggleFullscreen()
              }}
              className="btn header-item noti-icon waves-effect"
              data-toggle="fullscreen"
            >
              <i className="uil-minus-path" />
            </button>
          </Dropdown>

          <ProfileMenu />
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  // changeSidebarType: PropTypes.func,
  // leftMenu: PropTypes.any,
  // leftSideBarType: PropTypes.any,
  // showRightSidebar: PropTypes.any,
  // showRightSidebarAction: PropTypes.func,
  // t: PropTypes.any,
  // toggleLeftmenu: PropTypes.func,
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType }
}

export default connect(mapStatetoProps, {
  // showRightSidebarAction,
  // toggleLeftmenu,
  // changeSidebarType,
})(Header)
