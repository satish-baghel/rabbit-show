import { useState } from "react"

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
// Redux

// users
import user4 from "../../../assets/images/users/avatar-4.jpg"

const ProfileMenu = () => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [username] = useState("Admin")

  return (
    <Dropdown
      isOpen={menu}
      toggle={() => setMenu(!menu)}
      className="d-inline-block"
    >
      <DropdownToggle
        className="btn header-item waves-effect"
        id="page-header-user-dropdown"
        tag="button"
      >
        <img
          className="rounded-circle header-profile-user"
          src={user4}
          alt="Header Avatar"
        />
        <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
          {username}
        </span>{" "}
        <i className="uil-angle-down d-none d-xl-inline-block font-size-15" />
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        <DropdownItem tag="a" href="/profile">
          {" "}
          <i className="uil uil-user-circle font-size-18 align-middle text-muted me-1" />
          View Profile
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

ProfileMenu.propTypes = {
}

export default ProfileMenu
