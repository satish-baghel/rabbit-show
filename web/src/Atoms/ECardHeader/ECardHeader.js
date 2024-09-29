import _ from 'lodash'
import { CardHeader } from 'reactstrap'
import styled from 'styled-components'

//
const ECardHeader = (props) => {
    const cardProps = _.omitBy(props, 'children')
    return <StyledCardHeader {...cardProps}>{props?.children}</StyledCardHeader>
}

export default ECardHeader
const StyledCardHeader = styled(CardHeader)`
    border-bottom: 1px solid #e4e4e4;
`
