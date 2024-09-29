import styled from 'styled-components'

const { Navbar } = require('reactstrap')

const ENavbar = ({ children, ...rest }) => {
    return <StyleNavbar {...rest}>{children}</StyleNavbar>
}

export default ENavbar

const StyleNavbar = styled(Navbar)``
