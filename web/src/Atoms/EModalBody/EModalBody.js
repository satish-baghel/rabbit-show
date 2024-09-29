import { ModalBody } from 'reactstrap'
import { styled } from 'styled-components'

const EModalBody = (props) => <StyledModalBody {...props}>{props.children}</StyledModalBody>

export default EModalBody

const StyledModalBody = styled(ModalBody)``
