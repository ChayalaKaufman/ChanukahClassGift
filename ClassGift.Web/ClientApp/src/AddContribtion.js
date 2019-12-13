//import React from 'react';
//import axios from 'axios';
//import { produce } from 'immer';

//class AddContribution extends React.Component {
//    state = {
//        student: {
//            firstName: '',
//            lastName:''
//        },
//        contributionAmount: ''
//    }
//    componentDidMount = () => {
//        const id = this.props.match.params.id;

//        if (id) {

//            axios.get(`/api/students/getStudent?id=${id}`).then(({ data }) => {
//                this.setState({ student: data });
//            });
//        }
//        else {
//            axios.get('/api/people/getAll').then(({ data }) => {
//                this.setState({ people: data });
//            });
//        }
//    }
    

//    render() {
//        return (
//            <div className="container">
//                <div className="row">
//                    <div className="col-md-4 well">
//                        <h1>Add Contribution</h1>
//                        <input type="text"
//                            name="contributionAmount"
//                            value={student.firstName}
//                            onChange={this.onInputChange}
//                            placeholder="Amount"
//                            className="form-control"
//                        />
//                        <button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
//                    </div>
//                </div>
//            </div>);
//            )
//    }
//}