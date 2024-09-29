import { Modal } from 'reactstrap'
import { styled } from 'styled-components'

const EModal = (props) => <StyledModal {...props}>{props.children}</StyledModal>

export default EModal

const StyledModal = styled(Modal)`
    .modal-content {
        border: none;
    }
`
