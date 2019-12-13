import React from 'react';

const StudentForm = ({ student, onInputChange, onSubmit }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 well">
                    <h1>Add Student</h1>
                    <input type="text"
                        name="firstName"
                        //value={student.firstName}
                        onChange={onInputChange}
                        placeholder="First Name"
                        className="form-control"
                    />
                    <br />
                    <input type="text"
                        name="lastName"
                        //value={student.lastName}
                        onChange={onInputChange}
                        placeholder="Last Name"
                        className="form-control"
                    />
                    <br />
                    <input type="text"
                        name="Parent Name"
                        //value={student.parentName}
                        onChange={onInputChange}
                        placeholder="Parent Name"
                        className="form-control"
                    />
                    <br />
                    <input type="text"
                        name="Phone"
                        //value={student.phone}
                        onChange={onInputChange}
                        placeholder="Phone Number"
                        className="form-control"
                    />
                    <br />
                    <input type="text"
                        name="Email"
                        //value={student.email}
                        onChange={onInputChange}
                        placeholder="Email"
                        className="form-control"
                    />
                    <br />
                    <input type="text"
                        name="contributionAmount"
                        //value={student.contributionAmount}
                        onChange={onInputChange}
                        placeholder="Contribution Amount"
                        className="form-control"
                    />
                    <br />
                    <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default StudentForm;