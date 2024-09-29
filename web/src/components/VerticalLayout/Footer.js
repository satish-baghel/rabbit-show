
import { Container, Row, Col } from "reactstrap"

const Footer = () => (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col sm={12}>
            <div className="text-sm-end d-none d-sm-block">
              {new Date().getFullYear()} © . Easy2show. All rights reserved.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )

export default Footer
