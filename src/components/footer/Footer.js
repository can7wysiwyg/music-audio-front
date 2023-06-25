import { Container, Row, Col } from 'react-bootstrap';
function Footer() {
    return(<>

<footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Audio-Reader {new Date().getFullYear()}</Col>
        </Row>
      </Container>
    </footer>


    </>)
}

export default Footer