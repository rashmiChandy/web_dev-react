/* Packages */
import { React, useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import axios from 'axios';

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';

/* Images */
import interview from './../images/improve-interviewing-skills-featured.png';

function ScheduleInterview() {
    const [interviewDateAndTime, setinterviewDateAndTime] = useState(new Date());
    const [course, setcourse] = useState("", null)
    const [applicantId, setapplicantId] = useState("test")
    const [hirerId, sethirerId] = useState("test")
    const [applicantEmail, setapplicantEmail] = useState("", null)
    const [position, setposition] = useState("TA45", null)
    const [scheduleInterviewState, setscheduleInterviewState] = useState(false);
    const [validInterviewAssistantEmail, setvalidInterviewAssistantEmail] = useState(false);
    const [validInterviewAssistantCourse, setvalidInterviewAssistantCourse] = useState(false);
    const [scheduleInterviewAlertMsg, setscheduleInterviewAlertMsg] = useState("", null);
    const [interviewState, setinterviewState] = useState(false);
    const [scheduledStatus, setscheduledStatus] = useState("Interview Scheduled")
    const [coursesLoading, setcoursesLoading] = useState(true)
    const [coursesList, setcoursesList] = useState([])
    const [applicantList, setapplicantList] = useState([])
    const [applicantsLoading, setapplicantsLoading] = useState(true)
    const [courseNotSelected, setcourseNotSelected] = useState(true)

    const schedule_interview_api = "/api/hiring-management/schedule-interview";
    const job_interview_status_api = "/api/hiring-management/update-job-application-status";

    useEffect(() => {
        let items = []
        async function getcourses() {
            await axios.get("/api/course").then((response) => {
                // console.log(response.data.courses);
                items.push(<option>{""}</option>);
                for (let i = 0; i < response.data.courses.length; i++) {
                    // console.log(response.data.courses[i].courseId)
                    items.push(<option>{response.data.courses[i].courseId}</option>);
                }
                setcoursesList(items)
                setcoursesLoading(false)
            });
        }
        getcourses()
    }, [course,position]);

    const handleDateChange = (date) => {
        setinterviewDateAndTime(date);
    };

    const updateApplicants = event => {
        // console.log(event.target.value)
        let items = []
        async function getapplicants() {
            await axios.get("/api/hiring-management/getApplicantsByCourseAndJob", {
                params: {
                    'course': event.target.value,
                    'jobPosition': position
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        // console.log(response.data.courses);
                        items.push(<option>{""}</option>);
                        for (let i = 0; i < response.data.applicants.length; i++) {
                            // console.log(response.data)
                            items.push(<option>{response.data.applicants[i].email}</option>);
                        }
                        setapplicantList(items)
                        setapplicantsLoading(false)
                    }
                }).catch((error) => {
                    // console.log(error.response.data.message);
                    items.push(<option>{error.response.data.message}</option>);
                    setapplicantList(items)
                    setapplicantsLoading(false)
                });
        }
        setcourse(event.target.value)
        setcourseNotSelected(false)
        getapplicants()
    }

    const updatePosition = event => {
        let items = []
        setposition(event.target.value)
        async function getapplicants() {
            await axios.get("/api/hiring-management/getApplicantsByCourseAndJob", {
                params: {
                    'course': course,
                    'jobPosition': event.target.value
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        // console.log(response.data.courses);
                        items.push(<option>{""}</option>);
                        for (let i = 0; i < response.data.applicants.length; i++) {
                            // console.log(response.data)
                            items.push(<option>{response.data.applicants[i].email}</option>);
                        }
                        setapplicantList(items)
                        setapplicantsLoading(false)
                    }
                }).catch((error) => {
                    // console.log(error.response.data.message);
                    items.push(<option>{error.response.data.message}</option>);
                    setapplicantList(items)
                    setapplicantsLoading(false)
                });
        }
        getapplicants()
    }

    const handleScheduleInterview = event => {
        event.preventDefault();
        setscheduleInterviewState(true)
        // console.log("trying to schedule an interview")
        // console.log(course)
        // console.log(applicantEmail)

        if (course === "") {
            // console.log("INSIDE COURSE INVALID")
            setvalidInterviewAssistantCourse(false);
            setscheduleInterviewAlertMsg("Please select a course.");
        }
        else {
            setvalidInterviewAssistantCourse(true);
            if (applicantEmail === "" || applicantEmail === "No Applicants Found") {
                setvalidInterviewAssistantEmail(false);
                setscheduleInterviewAlertMsg("Please select an applicant.");
            }
            else {
                setvalidInterviewAssistantEmail(true);
                async function scheduleInterview() {
                    await axios.post(schedule_interview_api,
                        {
                            'interviewDateAndTime': interviewDateAndTime,
                            'course': course,
                            'applicantId': applicantId,
                            'hirerId': hirerId,
                            'applicantEmail': applicantEmail,
                            'position': position
                        })
                        .then((response) => {
                            if (response.status === 200) {
                                // console.log(' successful!');
                                async function updateJobInterviewStatus() {
                                    await axios.put(job_interview_status_api,
                                        {
                                            'email': applicantEmail,
                                            'course': course,
                                            'jobPosition': position,
                                            'status': scheduledStatus
                                        })
                                        .then((response) => {
                                            if (response.status === 200) {
                                                // console.log(' successful!');
                                                setinterviewState(true)
                                            }
                                        }).catch((error) => {
                                            setscheduleInterviewAlertMsg(error.response.data.message);
                                            setinterviewState(false)
                                        });
                                }
                                updateJobInterviewStatus();
                                setscheduleInterviewAlertMsg(response.data.message)
                                setinterviewState(true)
                            }
                        }).catch((error) => {
                            setscheduleInterviewAlertMsg(error.response.data.message);
                            setinterviewState(false)
                        });
                }
                scheduleInterview();
            }
        }
    }

    return (
        <Card >
            <Card.Img variant="top" src={interview} />
            <Card.Body>
                <Card.Title>Schedule an Interview</Card.Title>
                <Form onSubmit={handleScheduleInterview}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Found an applicant interesting? <br />
                            Go ahead and schedule an interview with them!</Form.Label>
                        <Container fluid>
                            <Row>
                                <Col>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            disablePast
                                            id="date-picker-dialog"
                                            label="Pick a Date"
                                            format="MM/dd/yyyy"
                                            value={interviewDateAndTime}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }}
                                        /></MuiPickersUtilsProvider>
                                </Col>
                                <Col>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="time-picker"
                                            label="Select a time"
                                            value={interviewDateAndTime}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                "aria-label": "change time"
                                            }}
                                            minutesStep="5"
                                        />
                                    </MuiPickersUtilsProvider>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control as="select" onChange={updateApplicants}>
                                        {
                                            coursesLoading ? <option>Loading...</option> : coursesList
                                        }

                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                        Select the course.
                                    </Form.Text>
                                </Col>
                                <Col>
                                    <Form.Control as="select" onChange={updatePosition}>
                                        <option>TA45</option>
                                        <option>Marker</option>
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                        Select the job position.
                                    </Form.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control as="select" onChange={event => setapplicantEmail(event.target.value)}>
                                        {/* <option></option>
                                        {listApplicants()} */}
                                        {
                                            courseNotSelected ?
                                                <option>Select a course</option> :
                                                applicantsLoading ? <
                                                    option>Loading..</option> :
                                                    applicantList
                                        }
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                        Select the applicant.
                                    </Form.Text>
                                </Col>
                            </Row>
                        </Container>
                    </Form.Group>
                    {
                        scheduleInterviewState ?
                            validInterviewAssistantCourse && validInterviewAssistantEmail && interviewState ?
                                <Alert variant="success">
                                    {scheduleInterviewAlertMsg}
                                </Alert>
                                :
                                <Alert variant="danger">
                                    {scheduleInterviewAlertMsg}
                                </Alert>
                            :
                            null
                    }
                    <Button variant="primary" type="submit">Schedule</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default ScheduleInterview

