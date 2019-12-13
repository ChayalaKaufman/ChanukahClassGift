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
        const add = {
            contributionAmount: this.state.contributionAmount,
            id: this.props.student.id
        }
        axios.post('/api/students/addContribution', add).then(() => {
            { window.location.reload(false); }
        });
    }

    onCollectClick = (id) => {
        this.props.history.push(`/AddCollection/${this.props.student.id}`);
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
                        <button className='btn btn-info' onClick={this.onContributeClick}>Contribute</button>
                    </div>
                }
                </td>
                <td>{student.contributionAmount ? ' ' : <button className='btn btn-primary' onClick={this.onCollectClick}>Collect</button>}</td>
                <td>{student.contributionAmount /*? ' ' : <button className='btn btn-info' onClick={onViewCollectionsClick}>View Collections</button>*/}</td>
            </tr>
        )
    }
}
export default withRouter(StudentRow);