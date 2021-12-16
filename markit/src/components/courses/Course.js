import React, { useState, useEffect } from 'react';
import Validation from './Validation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Navbar, Nav, Collapse, Container, Col, Row } from 'react-bootstrap';
import { MdPlaylistAdd } from "react-icons/md";
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Course = () => {
    const [open, setOpen] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [courseList, setCourses] = useState([]);
    const [term, setTerm] = useState();
    const history = useHistory();

    const [item, setItems] = useState({
        courseid: "",
        coursename: ""
    });

    const [errors, setErrors] = useState({});
    const handleOnChange = (event) => {
        setItems({
            ...item,
            [event.target.name]: event.target.value
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(item));
        setFormValid(true);
    };

    const handleOnSearch = (event) => {
        setTerm(event.target.value);
    };

    async function handleCourseClick(c) {
        const id = c._id;
        <Link to="/courses/{id}">CourseDetail</Link>
        history.push({
            pathname: "/courses/" + id,
            state: {
                course: c,
                user: sessionStorage.getItem('markit-email')
            }
        });
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && formValid) {
            function handleRegistration(item) {
                Axios.post("/api/course/add", {
                    courseId: item.courseid,
                    courseName: item.coursename
                }).then((response) => {
                    setFormValid(false);
                    setItems({
                        courseid: "",
                        coursename: ""
                    });
                    alert("Successfully added");
                }, (error) => {
                    console.log(error);
                });
            }
            handleRegistration(item);
        }
        const getCourses = async () => {
            await Axios.get("/api/course").then((response) => {
                setCourses(response.data.courses);
            });
        };
        getCourses();
    }, [errors, formValid, item]);

    return (
        <article className="container-fluid">
            <div className="component">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">MarkIt</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link active href="#/courses">Courses</Nav.Link>
                        <Nav.Link href="">My Application</Nav.Link>
                        <Nav.Link href="">Hiring</Nav.Link>
                        <Nav.Link href="">Onboarding</Nav.Link>
                    </Nav>
                </Navbar>
                <br />
                <div className="component-body col">
                    <header className="title-header">
                        <h2>Hello {sessionStorage.getItem('markit-email')}, Welcome back!</h2>
                    </header>
                    <button className="click-icon" onClick={() => setOpen(!open)} aria-controls="example-collapse-text"
                        aria-expanded={open}> <MdPlaylistAdd /></button>
                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            <Container>
                                <Row className="form-row">
                                    <Col md={6}>
                                        <label className="label">Course ID</label>
                                        <input className="form-control" type="text" name="courseid" value={item.courseid} onChange={handleOnChange}></input>
                                        {errors.courseid && <p className="error">{errors.courseid}</p>}
                                    </Col>
                                    <Col md={6}>
                                        <label className="label">Course Name</label>
                                        <input className="form-control" type="text" name="coursename" value={item.coursename} onChange={handleOnChange}></input>
                                        {errors.coursename && <p className="error">{errors.coursename}</p>}
                                    </Col>
                                </Row>
                                <Row className="form-row">
                                    <Col md={{ span: 7, offset: 5 }}>
                                        <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>Submit</button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Collapse>
                    <section className="search-bar-section">
                        <div className="input-group">
                            <input className="form-control" type="text" placeholder="Search course..."
                                onChange={handleOnSearch}></input>
                        </div>
                    </section>
                    <section className="d-flex flex-row flex-nowrap overflow-auto course-section">
                        {courseList
                            .filter(course => {
                                if (term === "" || term === undefined) {
                                    return course;
                                }
                                else if (term && (course.courseName.toLowerCase().includes(term.toLowerCase()) ||
                                    course.courseId.includes(term))) {
                                    return course;
                                }
                            })
                            .map(c => (
                                <Container maxwidth="sm">
                                    <Card style={{ width: '18rem', backgroundColor: '#639fab', color: '#000000', height: '7rem' }} key={c._id} onClick={() => handleCourseClick(c)}>
                                        <Card.Body>
                                            <Card.Subtitle className="card-badge mb-2">{c.courseId}</Card.Subtitle>
                                            <Card.Text>{c.courseName}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Container>
                            ))}
                    </section>
                </div>
            </div>
        </article>
    );
}

export default Course;