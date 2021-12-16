import React, { useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useLocation } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { Container, Col, Row } from 'react-bootstrap';
import HiresManagement from '../hires-management/HiresManagement';
import Alert from '@material-ui/lab/Alert';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';

const CourseDetail = () => {
    const history = useHistory();
    const location = useLocation();
    const id = location.state.course._id;
    const [collaboratorUserId, setCollaboratorUserId] = useState();
    const [collaboratorCourseId, setCollaboratorCourseId] = useState();
    const [navigatedUserId, setNavigatedUserId] = useState();
    const [navigatedCourseId, setNavigatedCourseId] = useState();
    const [navigatedCourseName, setNavigatedCourseName] = useState();
    const [editField, setEditField] = useState(false);
    const [course, setCourse] = useState({
        courseid: "",
        coursename: ""
    });

    const handleOnChange = (event) => {
        setCourse({
            ...course,
            [event.target.name]: event.target.value
        });
    };

    const handleCollaboratorJoin = (event) => {
        event.preventDefault();
        Axios.post("/api/collaborator/join", {
            courseId: navigatedCourseId,
            userId: navigatedUserId
        }).then((response) => {
            setCollaboratorUserId(navigatedUserId);
            setCollaboratorCourseId(navigatedCourseId);
        }, (error) => {
            console.log(error);
        });
    };

    const handleCollaboratorLeave = (event) => {
        event.preventDefault();
        Axios.delete(`/api/collaborator/leave/${navigatedUserId}/${navigatedCourseId}`)
            .then((response) => {
                setCollaboratorUserId(undefined);
                setCollaboratorCourseId(undefined);
            }, (error) => {
                console.log(error);
            });
    };

    const handleEditCourse = (event) => {
        event.preventDefault();
        setEditField(true);
    };

    const handleFormSave = (event) => {
        event.preventDefault();
        if (course) {
            Axios.put(`/api/course/update/${id}`, {
                courseId: course.courseid,
                courseName: course.coursename
            }).then((response) => {
                setNavigatedCourseId(course.courseid);
                setNavigatedCourseName(course.coursename);
                setEditField(false);
                alert("Successfully updated");
            }, (error) => {
                console.log(error);
            });
        }
    }

    useEffect(() => {
        const id = location.state.course.courseId;
        const user = location.state.user;
        const name = location.state.course.courseName;
        setNavigatedUserId(user);
        setNavigatedCourseId(id);
        setNavigatedCourseName(name);
        if (id && user) {
            const getCollaborator = async () => {
                await Axios.get(`/api/collaborator/${user}/${id}`).then((response) => {
                    if (response.data.collaborator) {
                        setCollaboratorUserId(response.data.collaborator.userId);
                        setCollaboratorCourseId(response.data.collaborator.courseId);
                    }
                });
            };
            getCollaborator();
        }
    }, [location.state]);

    return (
        <div>
            <div className='header-course-detail'>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#/courses">Courses</Breadcrumb.Item>
                    <Breadcrumb.Item href={"#/courses/" + id}>CSCI {navigatedCourseId} - {navigatedCourseName}</Breadcrumb.Item>
                </Breadcrumb>
                {collaboratorUserId === undefined && collaboratorCourseId === undefined ?
                    <Alert variant="filled" severity="warning">
                        Join the course to collaborate and manage new hires!
                    </Alert> :
                    <Alert variant="filled" severity="success">
                        Yay! You joined the course!
                    </Alert>
                }
                <Col md={{ span: 6, offset: 4 }}>
                    {collaboratorUserId === undefined && collaboratorCourseId === undefined
                        ? <button type="button" className="btn btn-success course-collaborator" onClick={handleCollaboratorJoin}>Join</button>
                        : <button type="button" className="btn btn-danger course-collaborator" onClick={handleCollaboratorLeave}>Leave</button>
                    }
                    {collaboratorUserId === undefined && collaboratorCourseId === undefined
                        ? <button type="button" className="btn btn-success course-button" disabled>Edit</button>
                        : <button type="button" className="btn btn-success course-button" onClick={handleEditCourse}>Edit</button>}
                        <div style={{"margin":"28px"}}>  <Button variant="warning" onClick= {()=>history.push('/jobPosting/'+navigatedCourseId)}>View Job Posting</Button></div>
                   
                </Col>
            </div>
            <article>
                <div id="example-collapse-text">
                    <Container>
                        {editField === false && <Row className="form-row">
                            <Col md={6}>
                                <label className="label">Course ID</label>
                                <label className="form-control edit-field" type="text" name="courseid">{navigatedCourseId}</label>

                            </Col>
                            <Col md={6}>
                                <label className="label">Course Name</label>
                                <label className="form-control edit-field" type="text" name="coursename">{navigatedCourseName}</label>

                            </Col>
                        </Row>}
                        {editField && <Row className="form-row">
                            <Col md={6}>
                                <label className="label">Course ID</label>
                                <input className="form-control" type="text" name="courseid" value={course.courseid} onChange={handleOnChange}></input>

                            </Col>
                            <Col md={6}>
                                <label className="label">Course Name</label>
                                <input className="form-control" type="text" name="coursename" value={course.coursename} onChange={handleOnChange}></input>

                            </Col>
                            <Row className="form-row">
                                <Col md={{ span: 7, offset: 5 }}>
                                    <button type="button" className="btn btn-primary" onClick={handleFormSave}>Save</button>
                                </Col>
                            </Row>
                        </Row>}
                    </Container>
                </div>
            </article>
            <article>
                <section>
                    <HiresManagement />
                </section>
            </article>
        </div >
    );
}

export default CourseDetail;