import { Collapse } from 'reactstrap'
import styled from 'styled-components'

const ECollapse = ({ children, ...rest }) => {
    return <StyledCollapse {...rest}>{children}</StyledCollapse>
}

export default ECollapse

const StyledCollapse = styled(Collapse)``
