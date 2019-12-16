import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { withRouter } from 'react-router-dom';

class RecordCallsOrEmails extends React.Component {
    state = {
        student: {
            id: '',
            firstName: '',
            lastName: ''
        },
        callOrEmail: {
            type: '',
            notes: '',
            studentId: ''
        },
        disabled: true
    }

    componentDidMount = () => {
        const id = this.props.match.params.id;
        if (id) {
            axios.get(`/api/students/getStudent?id=${id}`).then(({ data }) => {
                const newState = produce(this.state, draft => {
                    draft.student = data;
                    draft.callOrEmail.studentId = id;
                });
                this.setState(newState);
            });
        }
        else {
            this.props.history.push('/studentstable');
        }
    }

    onInputChange = e => {
        const newState = produce(this.state, draft => {
            const { callOrEmail } = draft;
            callOrEmail[e.target.name] = e.target.value;
            if (callOrEmail.type) {
                draft.disabled = false;
            }
            else {
                draft.disabled = true;
            }
        });
        this.setState(newState);
    }

    onAddClick = (e) => {
        e.preventDefault();
        axios.post('/api/students/addCallOrEmail', this.state.callOrEmail).then(() => {
            const nextState = produce(this.state, draftState => {
                draftState.student = {
                    firstName: '',
                    lastName: '',
                    id: ''
                };
                draftState.callOrEmail = {
                    type: '',
                    notes: '',
                    studentId: ''
                };
            });
            this.setState(nextState);
            this.props.history.push('/studentstable');
        });
    }

    render() {
        return (
            <form>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 well">
                            <h2>Record Call/Email for {this.state.student.firstName + " " + this.state.student.lastName}</h2>
                            <textarea type="text"
                                name="notes"
                                value={this.state.callOrEmail.notes}
                                onChange={this.onInputChange}
                                placeholder="Type notes here..."
                                className="form-control"
                            />
                            <div className="form-check">
                                <label>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="email"
                                        onChange={this.onInputChange}
                                        className="form-check-input"
                                    />
                                    Email
                             </label>
                            </div>
                            <div className="form-check">
                                <label>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="call"
                                        onChange={this.onInputChange}
                                        className="form-check-input" />
                                    Call
                                 </label>
                            </div>
                            <br />
                            <button className="btn btn-primary" disabled={this.state.disabled}
                                onClick={this.onAddClick}>Add</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
export default withRouter(RecordCallsOrEmails);