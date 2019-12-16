import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import AddStudent from './AddStudent';
import StudentsTable from './StudentsTable'
import RecordCallsOrEmails from './RecordCallsOrEmails'
import ViewCallsOrEmails from './ViewCallsOrEmails';
import HomePage from './HomePage';

class App extends React.Component {
    render() {
        return (
            <div className="container" style={{ marginTop: 40 }}>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/addstudent' component={AddStudent} />
                <Route exact path='/studentsTable' component={StudentsTable} />
                <Route path='/RecordCallsOrEmails/:id?' component={RecordCallsOrEmails} />
                <Route path='/viewCallsOrEmails/:id?' component={ViewCallsOrEmails} />
            </div>
        );
    }
}

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root'));