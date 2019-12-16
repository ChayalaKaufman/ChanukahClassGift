import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import AddStudent from './AddStudent';
import StudentsTable from './StudentsTable'
import AddCollection from './AddCollection'
import ViewCollections from './ViewCollections';
import HomePage from './HomePage';

class App extends React.Component {
    render() {
        return (
            <div className="container" style={{ marginTop: 40 }}>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/addstudent' component={AddStudent} />
                <Route exact path='/studentsTable' component={StudentsTable} />
                <Route path='/addCollection/:id?' component={AddCollection} />
                <Route path='/viewCollections/:id?' component={ViewCollections} />
            </div>
        );
    }
}

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root'));