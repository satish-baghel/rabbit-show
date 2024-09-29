import _ from 'lodash'
import { Card } from 'reactstrap'
import styled from 'styled-components'

//
const ECard = (props) => {
    const cardProps = _.omitBy(props, 'children')
    return <StyledCard {...cardProps}>{props?.children}</StyledCard>
}

export default ECard

const StyledCard = styled(Card)``
