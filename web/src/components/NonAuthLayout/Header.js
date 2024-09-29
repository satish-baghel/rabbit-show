import { useState } from 'react'
import { NavbarBrand } from 'reactstrap'
import { Collapse, Navbar, NavbarToggler } from 'src/Atoms'

const Header = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)
    return (
        <Navbar>
            <NavbarBrand>Rabbit Show</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar></Collapse>
            {children}
        </Navbar>
    )
}

export default Header
