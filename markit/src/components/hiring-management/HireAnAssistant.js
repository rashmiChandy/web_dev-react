/* Packages */
import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';

/* Images */
import hire from './../images/Hiring-Staff.jpg'

function HireAnAssistant() {
    const [hireAssistantState, sethireAssistantState] = useState(false);
    const [validAssistantEmail, setvalidAssistantEmail] = useState(false);
    const [assistantEmailExists, setassistantEmailExists] = useState(false);
    const [hirerId, sethirerId] = useState("test")
    const [assistantEmail, setassistantEmail] = useState("", null);
    const [hireAssistantEmailAlertMsg, sethireAssistantEmailAlertMsg] = useState("", null);
    const [assistantCourse, setassistantCourse] = useState("", null);
    const [hireCourseState, sethireCourseState] = useState(false);
    const [position, setposition] = useState("TA45", null)
    const [inviteSuccess, setinviteSuccess] = useState(false)
    const [coursesLoading, setcoursesLoading] = useState(true)
    const [coursesList, setcoursesList] = useState([])
    const [applicantList, setapplicantList] = useState([])
    const [toggle, settoggle] = useState(false)
    const [selectedValue, setselectedValue] = useState('a')
    const [courseNotSelected, setcourseNotSelected] = useState(true)
    const [applicantsLoading, setapplicantsLoading] = useState(true)
    const [submitType, setsubmitType] = useState("")

    const hire_assistant_api = "/api/hiring-management/hire-assistant";
    const check_user_api = "/api/hiring-management/check-user";
    const job_interview_status_api = "/api/hiring-management/update-job-application-status";
    const delete_scheduled_interview_api = "/api/hiring-management/delete-scheduled-interview"

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
    }, [assistantCourse, position]);

    const updateRadio = event => {
        setselectedValue(event.target.value)
        settoggle(!toggle)
    }

    const updateApplicants = event => {
        // console.log(event.target.value)
        let items = []
        async function getapplicants() {
            await axios.get("/api/hiring-management/getInterviewScheduledByCourseAndJob", {
                params: {
                    'course': event.target.value,
                    'jobPosition': position,
                    'interviewDateAndTime': new Date()
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        // console.log(response.data.courses);
                        items.push(<option>{""}</option>);
                        for (let i = 0; i < response.data.applicants.length; i++) {
                            // console.log(response.data)
                            items.push(<option>{response.data.applicants[i].applicantEmail}</option>);
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
        setassistantCourse(event.target.value)
        setcourseNotSelected(false)
        getapplicants()
    }

    const updatePosition = event => {
        let items = []
        setposition(event.target.value)
        async function getapplicants() {
            await axios.get("/api/hiring-management/getInterviewScheduledByCourseAndJob", {
                params: {
                    'course': assistantCourse,
                    'jobPosition': event.target.value,
                    'interviewDateAndTime': new Date()
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        // console.log(response.data.courses);
                        items.push(<option>{""}</option>);
                        for (let i = 0; i < response.data.applicants.length; i++) {
                            // console.log(response.data)
                            items.push(<option>{response.data.applicants[i].applicantEmail}</option>);
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

    const hireAssistant = event => {
        event.preventDefault();
        sethireAssistantState(true);
        // console.log(hireAssistantState);
        // console.log(assistantEmail)

        if (assistantCourse === "") {
            sethireCourseState(false);
            sethireAssistantEmailAlertMsg("Please select a course.");
        }
        else {
            sethireCourseState(true);
            if (!toggle) {
                if (assistantEmail === "" || assistantEmail === "No Applicants Found") {
                    setvalidAssistantEmail(false);
                    sethireAssistantEmailAlertMsg("Please select an applicant.");
                }
                else {
                    let noInterview = false
                    setvalidAssistantEmail(true);
                    setassistantEmailExists(true);
                    async function updateJobApplicationStatus() {
                        await axios.put(job_interview_status_api,
                            {
                                'email': assistantEmail,
                                'course': assistantCourse,
                                'jobPosition': position,
                                'status': submitType
                            })
                            .then((response) => {
                                if (response.status === 200) {
                                    // console.log(' successful!');
                                    setinviteSuccess(true)
                                }
                            }).catch((error) => {
                                sethireAssistantEmailAlertMsg(error.response.data.message);
                                setinviteSuccess(false)
                            });

                        await axios.delete(delete_scheduled_interview_api,
                            {
                                params: {
                                    'applicantEmail': assistantEmail,
                                    'position': position,
                                    'course': assistantCourse
                                }
                            })
                            .then((response) => {
                                if (response.status === 200) {
                                    // console.log(' successful!');
                                    setinviteSuccess(true)
                                }
                            }).catch((error) => {
                                noInterview = true
                                sethireAssistantEmailAlertMsg("Applicant job application already denied.");
                                setinviteSuccess(false)
                            });

                        if (submitType === 'Hired') {
                            await axios.post(hire_assistant_api,
                                {
                                    'course': assistantCourse,
                                    'hirerId': hirerId,
                                    'applicantEmail': assistantEmail,
                                    'jobPosition': position,
                                    'status': 'Under Review',
                                    'comments': 'Under Review'
                                })
                                .then((response) => {
                                    if (response.status === 200) {
                                        // console.log(' successful!');
                                        setinviteSuccess(true)
                                        sethireAssistantEmailAlertMsg("Job offer sent.");
                                    }
                                }).catch((error) => {
                                    sethireAssistantEmailAlertMsg(error.response.data.message);
                                    setinviteSuccess(false)
                                });
                        }
                        else {
                            if (noInterview) {
                                setinviteSuccess(false)
                                sethireAssistantEmailAlertMsg("Applicant job application already denied.");
                            } else {
                                setinviteSuccess(true)
                                sethireAssistantEmailAlertMsg("Applicant Declined.");
                            }
                        }
                    }
                    updateJobApplicationStatus();
                    //sethireAssistantEmailAlertMsg(response.data.message)
                    //setinviteSuccess(true)

                }
            }
            else {
                if (!(/\S+@\S+\.\S+/.test(assistantEmail))) {
                    setvalidAssistantEmail(false);
                    // console.log("invalid mail")
                    sethireAssistantEmailAlertMsg("Invalid email.");
                }
                else {
                    //hire-assistant
                    setvalidAssistantEmail(true);
                    async function checkForUser() {
                        await axios.get(check_user_api,
                            {
                                params: {
                                    'email': assistantEmail
                                }
                            })
                            .then((response) => {
                                if (response.status === 200) {
                                    // console.log(' successful!');
                                    setassistantEmailExists(true);
                                    async function sendInvite() {
                                        await axios.post(hire_assistant_api,
                                            {
                                                'course': assistantCourse,
                                                'hirerId': hirerId,
                                                'applicantEmail': assistantEmail,
                                                'jobPosition': position,
                                                'status': 'Under Review',
                                                'comments': 'Under Review',

                                            })
                                            .then((response) => {
                                                if (response.status === 200) {
                                                    // console.log(' successful!');
                                                    setinviteSuccess(true)
                                                    sethireAssistantEmailAlertMsg(response.data.message);
                                                }
                                            }).catch((error) => {
                                                sethireAssistantEmailAlertMsg(error.response.data.message);
                                                setinviteSuccess(false)
                                            });
                                    }
                                    sendInvite();
                                }
                            }).catch((error) => {
                                setassistantEmailExists(false);
                                sethireAssistantEmailAlertMsg(error.response.data.message);
                            });
                    }
                    checkForUser();
                }
            }
        }
    }

    return (
        <Card >
            <Card.Img variant="top" src={hire} />
            <Card.Body>
                <Card.Title>Hire an Assistant</Card.Title>
                <Form onSubmit={hireAssistant}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Already found the assistant you are looking for? <br />
                            Go ahead and add them directly with a simple click!</Form.Label>
                        <Container fluid>
                            <Row>
                                <Col>
                                    <Form.Control as="select" onChange={updateApplicants}>
                                        {
                                            coursesLoading ? <option>Loading...</option> : coursesList
                                        }
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                        Select the course for which you want to hire.
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
                                    <Form.Check type="radio" name="check" id="interviewed" value='a' label="Interviewed applicant" onChange={updateRadio} checked={selectedValue === 'a'} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control as="select" disabled={toggle} onChange={event => setassistantEmail(event.target.value)}>
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
                            <Row>
                                <Col>
                                    <Form.Check type="radio" name="check" id="newApplicant" value='b' onChange={updateRadio} label="New applicant" checked={selectedValue === 'b'} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control type="email" disabled={!toggle} placeholder="example@mail.com" onChange={event => setassistantEmail(event.target.value)} required />
                                    <Form.Text className="text-muted">
                                        Enter the email address of the assistant you want to hire.
                                    </Form.Text>
                                </Col>
                            </Row>
                        </Container>
                    </Form.Group>
                    {
                        hireAssistantState ?
                            assistantEmailExists && validAssistantEmail && hireCourseState && inviteSuccess ?
                                <Alert variant="success">
                                    {hireAssistantEmailAlertMsg}
                                </Alert>
                                :
                                <Alert variant="danger">
                                    {hireAssistantEmailAlertMsg}
                                </Alert>
                            :
                            null
                    }
                    <Button variant="primary" type="submit" name="submit" value="Hired" onClick={event => setsubmitType(event.target.value)}>Hire</Button>{'   '}
                    <Button variant="danger" type="submit" name="submit" value="Declined" onClick={event => setsubmitType(event.target.value)} disabled={toggle}>Decline</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default HireAnAssistant