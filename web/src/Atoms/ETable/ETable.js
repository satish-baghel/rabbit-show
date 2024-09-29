import { Table } from 'reactstrap'
import styled from 'styled-components'

const ETable = (props) => {
    const {
        hover = true,
        responsive = true,
        striped = true,
        size,
        className,
        borderless = false,
        bordered = false
    } = props
    return (
        <StyledTable
            hover={hover}
            responsive={responsive}
            striped={striped}
            size={size}
            className={className}
            borderless={borderless}
            bordered={bordered}
        >
            {props.children}
        </StyledTable>
    )
}

export default ETable

// Add css hare
// https://styled-components.com/ documentation for styled component
const StyledTable = styled(Table)`
    // thead tr th {
    //     background-color: #5b73e8;
    //     color: white;
    // }
    thead {
        background: #293552 !important;
        color: #fff !important;
        font-size: 18px !important;
        th {
            background: #293552 !important;
            color: #fff !important;
            font-size: 18px !important;
        }
    }
    tbody tr {
        border-bottom: 1px solid;
        border-color: #ced4da;
        font-size: 18px;
        color: #112233 !important;
    }
`
