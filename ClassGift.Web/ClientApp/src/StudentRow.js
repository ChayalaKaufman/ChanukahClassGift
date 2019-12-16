import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { withRouter } from 'react-router-dom';

class StudentRow extends React.Component {

    state = {
        contributionAmount: ''
    }

    onInputChange = e => {
        const newState = produce(this.state, draft => {
            draft.contributionAmount = e.target.value;
        });
        this.setState(newState);
    }

    onContributeClick = () => {
        const contribution = {
            contributionAmount: this.state.contributionAmount,
            id: this.props.student.id
        }
        axios.post('/api/students/addContribution', contribution).then(() => {
            window.location.reload(false);
        });
    }

    onCollectClick = () => {
        this.props.history.push(`/AddCollection/${this.props.student.id}`);
    }

    onViewCollectionsClick = () => {
        this.props.history.push(`/ViewCollections/${this.props.student.id}`);
    }

    onSendEmailClick = () => {
        const id = this.props.student.id;
        axios.post(`/api/students/sendEmail?id=${id}`).then(({ data }) => {
            alert(data);
            window.location.reload(false);
        });
    }

    render() {
        const { student, index } = this.props;
        return (
            <tr key={index}>
                <td>{student.firstName + " " + student.lastName}</td>
                <td>{student.parentName}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>{student.contributionAmount ? student.contributionAmount :
                    <div>
                        <input type="text"
                            value={this.state.contributionAmount}
                            onChange={this.onInputChange}
                            placeholder="Amount"
                            className="form-control"
                        />
                        <button className='btn btn-secondary' onClick={this.onContributeClick}>Contribute</button>
                    </div>
                }
                </td>
                <td>{student.contributionAmount ? ' ' : <button className='btn btn-secondary' onClick={this.onCollectClick}>Add Collection</button>}</td>
                <td><button className='btn btn-link' onClick={this.onViewCollectionsClick}>View Collections</button></td>
                <td>{student.contributionAmount || !student.email ? ' ' :<button className='btn btn-link' onClick={this.onSendEmailClick}>Send Email</button>}</td>
            </tr>
        )
    }
}
export default withRouter(StudentRow);