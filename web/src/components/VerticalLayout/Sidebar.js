
import { connect } from "react-redux"
import { Link } from "react-router-dom"

//
import SidebarContent from "./SidebarContent"

import logoSm from "../../assets/images/logo-sm.png"
import logoDark from "../../assets/images/logo-dark.png"
import logoLight from "../../assets/images/logo-light.png"

const Sidebar = () => {
  function tToggle() {
    const { body } = document
    const windowSize = document.documentElement.clientWidth

    body.classList.toggle("vertical-collpsed")
    body.classList.toggle("sidebar-enable")

    if (windowSize > 991) {
      body.getAttribute("data-sidebar-size") === "sm"
        ? body.setAttribute("data-sidebar-size", "lg")
        : body.setAttribute("data-sidebar-size", "sm")
    }
  }

  return (
    <div className="vertical-menu">
      <div className="navbar-brand-box">
        <Link to="/" className="logo logo-dark">
          <span className="logo-sm">
            <img src={logoSm} alt="" height="30" />
          </span>
          <span className="logo-lg">
            <img src={logoDark} alt="" height="40" />
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
        onClick={() => {
          tToggle()
        }}
        type="button"
        className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
      >
        <i className="fa fa-fw fa-bars" />
      </button>
      <div className="sidebar-menu-scroll">
        <SidebarContent />
      </div>
    </div>
  )
}

Sidebar.propTypes = {
}

const mapStatetoProps = state => ({
  layout: state.Layout,
})
export default connect(mapStatetoProps, {})(Sidebar)
