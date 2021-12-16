/* Packages */
import { React } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ScheduleInterview from './ScheduleInterview'
import HireAnAssistant from './HireAnAssistant'

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';



function HiringManagment() {
    return (
        <Container className="HM-container">
            <Row>
                <Col>
                    <ScheduleInterview />
                </Col>
                <Col>
                    <HireAnAssistant />
                </Col>
            </Row>
        </Container>
    )
}

export default HiringManagment
