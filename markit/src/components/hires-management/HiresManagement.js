import { React } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TeachingAssistantHires from './TeachingAssistantHires';
import MarkerHires from './MarkerHires';
import 'bootstrap/dist/css/bootstrap.min.css';

function HiresManagment() {
    return (
        <Container className="HM-container">
            <Row>
                <Col>
                    <TeachingAssistantHires />
                </Col>
                <Col>
                    <MarkerHires />
                </Col>
            </Row>
        </Container>
    )
}

export default HiresManagment
