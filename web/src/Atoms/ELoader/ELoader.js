import { Spinner } from 'reactstrap'
import styled from 'styled-components'

const ELoader = (props) => <StyleLoader {...props} />

export default ELoader

const StyleLoader = styled(Spinner)`
    height: 3rem;
    width: 3rem;
`
