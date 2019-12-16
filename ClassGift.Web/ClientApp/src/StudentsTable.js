import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import StudentRow from './StudentRow';
import { produce } from 'immer';

class StudentsTable extends React.Component {
    state = {
        students: [],
        viewStudents: [],
        totalContributions: 0,
        disabledPaid: false,
        disabledUnpaid: false,
        disabledAll: true
    }
    componentDidMount = () => {
        axios.get('api/students/getall').then(({ data }) => {
            data.forEach(s => s.markedForDeletion = false);
            this.setState({ students: data });
            this.setState({ viewStudents: data });
        });
        axios.get('api/students/getTotalContributions').then(({ data }) => {
            this.setState({ totalContributions: data });
        });
    }

    toggleView = (view) => {
        const newState = produce(this.state, draft => {
            draft.disabledPaid = false;
            draft.disabledUnpaid = false;
            draft.disabledAll = false;
            if (view === 'paid') {
                draft.viewStudents = this.state.students.filter(s => s.contributionAmount);
                draft.disabledPaid = true;
            }
            else if (view === 'unpaid') {
                draft.viewStudents = this.state.students.filter(s => !s.contributionAmount);
                draft.disabledUnpaid = true;
            }
            else {
                draft.viewStudents = this.state.students;
                draft.disabledAll = true;
            }
        });
        this.setState(newState);
    }

    render() {
        return (
            <div className="container">
                <Link to="/addStudent">
                    <button className='btn btn-primary'>Add Student</button>
                </Link>
                <br /><br />
                <div className="btn-group" role="group">
                    <button className='btn btn-secondary' disabled={this.state.disabledAll} onClick={() => this.toggleView('all')}>View All</button>
                    <button className='btn btn-secondary' disabled={this.state.disabledPaid} onClick={() => this.toggleView('paid')}>View Paid</button>
                    <button className='btn btn-secondary' disabled={this.state.disabledUnpaid} onClick={() => this.toggleView('unpaid')}>View Unpaid</button>
                </div>
                <h1 className='col-md-6 col-md-offset-3'>Master Class List</h1>
                <br/>
                <h3>Total Contributions:${this.state.totalContributions}</h3>
                <br /><br />
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Parent Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Contribution Amount</th>
                            <th>Add Collection</th>
                            <th>View Collections</th>
                            <th>Send Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.viewStudents.map((student, index) =>
                            <StudentRow student={student} key={index} index={index} onContributeClick={this.onContributeClick} />)}
                    </tbody>
                </table>
            </div >
        )
    }
}
export default withRouter(StudentsTable);