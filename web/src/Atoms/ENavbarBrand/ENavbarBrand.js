import styled from 'styled-components'

const { NavbarBrand } = require('reactstrap')

const ENavbarBrand = ({ children, ...rest }) => {
    return <StyleENavbarBrand {...rest}>{children}</StyleENavbarBrand>
}

export default ENavbarBrand

const StyleENavbarBrand = styled(NavbarBrand)``
