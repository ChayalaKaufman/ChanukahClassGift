import React from 'react';
import { withRouter } from 'react-router-dom';
import { produce } from 'immer';
import axios from 'axios';

class AddStudent extends React.Component {

    state = {
        student: {
            firstName: '',
            lastName: '',
            parentName: '',
            phone: '',
            email: '',
            contributionAmount: ''
        },
        disabled: true
    };

    onInputChange = e => {
        const newState = produce(this.state, draft => {
            const { student } = draft;
            student[e.target.name] = e.target.value;
            if (student.firstName && student.lastName && student.parentName && student.phone) {
                draft.disabled = false;
            }
            else {
                draft.disabled = true;
            }
        });
        this.setState(newState);
    }

    onSubmit = () => {
        axios.post('/api/students/addstudent', this.state.student).then(() => {
            const nextState = produce(this.state, draftState => {
                draftState.student = {
                    firstName: '',
                    lastName: '',
                    parentName: '',
                    phone: '',
                    email: '',
                    contributionAmount: ''
                }
            });
            this.setState(nextState);
            this.props.history.push('/studentstable');
        });
    }

    render() {
        const { student } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 well">
                        <h1>Add Student</h1>
                        <input type="text"
                            name="firstName"
                            value={student.firstName}
                            onChange={this.onInputChange}
                            placeholder="First Name"
                            className="form-control"
                        />
                        <br />
                        <input type="text"
                            name="lastName"
                            value={student.lastName}
                            onChange={this.onInputChange}
                            placeholder="Last Name"
                            className="form-control"
                        />
                        <br />
                        <input type="text"
                            name="parentName"
                            value={student.parentName}
                            onChange={this.onInputChange}
                            placeholder="Parent Name"
                            className="form-control"
                        />
                        <br />
                        <input type="text"
                            name="phone"
                            value={student.phone}
                            onChange={this.onInputChange}
                            placeholder="Phone Number"
                            className="form-control"
                        />
                        <br />
                        <input type="text"
                            name="email"
                            value={student.email}
                            onChange={this.onInputChange}
                            placeholder="Email"
                            className="form-control"
                        />
                        <br />
                        <input type="text"
                            name="contributionAmount"
                            value={student.contributionAmount}
                            onChange={this.onInputChange}
                            placeholder="Contribution Amount"
                            className="form-control"
                        />
                        <br />
                        <button id="submit" disabled={this.state.disabled} className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                    </div>
                </div>
            </div>);
    }
}

export default withRouter(AddStudent);