import React from 'react';

export default class AddStudentForm extends React.Component {
    render() {
        const { student, onInputChange, onSubmit, disabled } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 well">
                        <h1>Add Student</h1>
                        <input type="text"
                            name="firstName"
                            value={student.firstName}
                            onChange={onInputChange}
                            placeholder="First Name"
                            className="form-control"
                        />
                        <br />
                        <input type="text"
                            name="lastName"
                            value={student.lastName}
                            onChange={onInputChange}
                            placeholder="Last Name"
                            className="form-control"
                        />
                        <br />
                        <input type="text"
                            name="parentName"
                            value={student.parentName}
                            onChange={onInputChange}
                            placeholder="Parent Name"
                            className="form-control"
                        />
                        <br />
                        <input type="text"
                            name="phone"
                            value={student.phone}
                            onChange={onInputChange}
                            placeholder="Phone Number"
                            className="form-control"
                        />
                        <br />
                        <input type="text"
                            name="email"
                            value={student.email}
                            onChange={onInputChange}
                            placeholder="Email"
                            className="form-control"
                        />
                        <br />
                        <input type="text"
                            name="contributionAmount"
                            value={student.contributionAmount}
                            onChange={onInputChange}
                            placeholder="Contribution Amount"
                            className="form-control"
                        />
                        <br />
                        <button disabled={disabled} className="btn btn-primary" onClick={onSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}