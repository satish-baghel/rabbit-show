import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import { Container } from 'reactstrap'

const NonAuthLayout = ({ children }) => {
    return (
        <Container fluid>
            <Header />
            {children}
            <Footer />
        </Container>
    )
}

NonAuthLayout.propTypes = {
    children: PropTypes.node
}

export default NonAuthLayout
