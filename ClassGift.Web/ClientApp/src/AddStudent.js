import React from 'react';
import { withRouter } from 'react-router-dom';
import { produce } from 'immer';
import axios from 'axios';
import StudentForm from './AddStudentForm';

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
        const { student, disabled } = this.state;
        return (
            <StudentForm student={student} onInputChange={this.onInputChange} onSubmit={this.onSubmit}
                disabled={disabled}
            />
            );
    }
}

export default withRouter(AddStudent);