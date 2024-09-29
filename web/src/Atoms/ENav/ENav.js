import React from 'react'
import { Nav } from 'reactstrap'
import styled from 'styled-components'

const ENav = ({ children, ...rest }) => {
    return <styledNav {...rest}>{children}</styledNav>
}

export default ENav

const styledNav = styled(Nav)``
