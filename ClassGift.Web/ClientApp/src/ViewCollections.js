import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { withRouter, Link } from 'react-router-dom';
import CollectionRow from './CollectionRow';

class ViewCollections extends React.Component {
    state = {
        collections: [],
        student: {
            firstName: '',
            lastName: '',
            id: 0
        }
    }
    
    componentDidMount = () => {
        const id = this.props.match.params.id;
        if (id) {
            axios.get(`/api/students/getCollections?id=${id}`).then(({ data }) => {
                    const newState = produce(this.state, draft => {
                        draft.collections = data.collections;
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
        const { student, collections } = this.state;
        let content;
        if (!collections.length) {
            content = <div className="well">
                <h1>There are no collections to display for {student.firstName + ' ' + student.lastName}</h1>
            </div>
        }
        else {
            content = 
                <div className="container">
                <h1>Collections for {student.firstName + ' '+ student.lastName}</h1>
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collections.map((collection, index) =>
                                <CollectionRow collection={collection} key={index} />)}
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
export default withRouter(ViewCollections);