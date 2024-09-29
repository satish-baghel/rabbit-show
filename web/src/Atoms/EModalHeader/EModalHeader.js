import { ModalHeader } from 'reactstrap'
import { styled } from 'styled-components'

const EModalHeader = (props) => <StyledModalHeader {...props}>{props.children}</StyledModalHeader>

export default EModalHeader

const StyledModalHeader = styled(ModalHeader)`
    background: #112233 !important;
    .modal-title {
        color: #ffff;
    }
`
