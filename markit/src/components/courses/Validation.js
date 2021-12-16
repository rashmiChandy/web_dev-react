const Validation = (item) => {

    let errors = {};
    let alpNumRegEx = /^[A-Za-z0-9]+$/;

    if (!item.courseid) {
        errors.courseid = "Course ID cannot be empty!";
    }
    else if (!(alpNumRegEx.test(item.courseid))) {
        errors.courseid = "Course ID must contain alpha-numeric characters!"
    }

    if (!item.coursename) {
        errors.coursename = "Course Name cannot be empty!";
    }
    else if (!(alpNumRegEx.test(item.coursename))) {
        errors.coursename = "Course Name must contain alpha-numeric characters!"
    }
    return errors;
}

export default Validation;