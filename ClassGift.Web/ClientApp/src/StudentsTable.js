import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import StudentRow from './StudentRow';

class StudentsTable extends React.Component {
    state = {
        students: []
    }
    componentDidMount = () => {
        axios.get('api/students/getall').then(({ data }) => {
            this.setState({ students: data });
        })
    }
    
    render() {
        return (
            <div className="container">
                <Link to="/addStudent">
                    <button className='btn btn-primary'>Add Student</button>
                </Link>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Parent Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Contribution Amount</th>
                            <th>Collect</th>
                            <th>View Collections</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.students.map((student, index) =>
                            <StudentRow student={student} key={index} index={index} onContributeClick={this.onContributeClick} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(StudentsTable);