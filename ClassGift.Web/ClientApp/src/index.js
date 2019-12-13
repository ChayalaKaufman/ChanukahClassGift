import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AddStudent from './AddStudent';
import StudentsTable from './StudentsTable'
import AddCollection from './AddCollection'
class App extends React.Component {
    render() {
        return (
            <div>
                <Route exact path='/addstudent' component={AddStudent} />
                <Route exact path='/studentsTable' component={StudentsTable} />
                <Route exact path='/addCollection' component={AddCollection} />
            </div>
        );
    }
}

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root'));