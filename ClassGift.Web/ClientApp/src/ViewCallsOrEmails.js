import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { withRouter, Link } from 'react-router-dom';
import CallsOrEmailsRow from './CallsOrEmailsRow';

class ViewCallsOrEmails extends React.Component {
    state = {
        callsOrEmails: [],
        student: {
            firstName: '',
            lastName: '',
            id: 0
        }
    }
    componentDidMount = () => {
        const id = this.props.match.params.id;
        if (id) {
            axios.get(`/api/students/getCallsOrEmails?id=${id}`).then(({ data }) => {
                    const newState = produce(this.state, draft => {
                        draft.callsOrEmails = data.callsOrEmails;
                        draft.student = data.student;
                    });
                    this.setState(newState);
            });
        }
        else {
            debugger
            this.props.history.push('/studentstable');
        }
    }

    render() {
        const { student, callsOrEmails } = this.state;
        let content;
        if (!callsOrEmails.length) {
            content = <div className="well">
                <h1>There were no calls or emails for {student.firstName + ' ' + student.lastName}</h1>
            </div>
        }
        else {
            content = 
                <div className="container">
                <h1>Calls/Emails for {student.firstName + ' '+ student.lastName}</h1>
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                        {callsOrEmails.map((callOrEmail, index) =>
                            <CallsOrEmailsRow callOrEmail={callOrEmail} key={index} />)}
                        </tbody>
                </table>
            </div>
        }
        return (
            <div>
                {content}
                <Link to="/studentstable">
                    <button className='btn btn-info'>Back to all students</button>
                </Link>
            </div>
            )
    }
}
export default withRouter(ViewCallsOrEmails);