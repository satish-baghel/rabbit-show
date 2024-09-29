import { FormFeedback } from 'reactstrap'
import styled from 'styled-components'

const EInvalidFeedback = (message) => {
   if(message?.children){
    return <StyledFormFeedback>{message?.children}</StyledFormFeedback>
   }
    return <StyledFormFeedback>{message}</StyledFormFeedback>
}

export default EInvalidFeedback

const StyledFormFeedback = styled(FormFeedback)`
    display: block;
`
