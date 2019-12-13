import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { withRouter } from 'react-router-dom';

class AddCollection extends React.Component {
    state = {
        student: {
            id: '',
            firstName: '',
            lastName: ''
        },
        collection: {
            type: '',
            notes: '',
            studentId: ''
        }
    }
    componentDidMount = () => {
        const id = this.props.match.params.id;
        if (id) {
            debugger
            axios.get(`/api/students/getStudent?id=${id}`).then(({ data }) => {
                //this.state.students = data;
                    //this.setState({ collection.studentId = id })
            });
        }
        else {
            this.props.history.push('/studentstable');
        }
    }

    onInputChange = e => {
        debugger
        const newState = produce(this.state, draft => {
            const { collection } = draft;
            collection[e.target.name] = e.target.value;
        });
        this.setState(newState);
    }

    onAddClick = () => {
        this.state.collection.studentId = this.props.match.params.id;
        console.log(this.state.collection);
        debugger
        axios.post('/api/students/addCollection', this.state.collection).then(() => {
            //const nextState = produce(this.state, draftState => {

            //});
            //this.setState(nextState);
            this.props.history.push('/studentstable');
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 well">
                        <h1>Add Collection</h1>
                        <input type="textarea"
                            name="notes"
                            value={this.state.collection.notes}
                            onChange={this.onInputChange}
                            placeholder="Notes..."
                            className="form-control"
                        />
                        {/*<input type="text"
                            name="contributionAmount"
                            value={this.state.contributionAmount}
                            onChange={this.onInputChange}
                            placeholder="Amount"
                            className="form-control"
                        >*/}
                        <input type="radio" name="type" onChange={this.onInputChange} value="email">Email</input>
                        <input type="radio" name="type" onChange={this.onInputChange} value="call">Call</input>
                        <button className="btn btn-primary" onClick={this.onAddClick}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(AddCollection);