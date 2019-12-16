import React from 'react';
import { Link, withRouter } from 'react-router-dom';
class HomePage extends React.Component {
    render() {
        return (
            <div className='well'>
                <h1>Welcome to the class moms' collecting-for-teacher's-Chanukah-gift app!!</h1>
                <h3>Collecting money from all of the mothers in your child's class for a teacher's Chanukah gift can
                    be difficult. There's lots of information to keep track of and it can just get
                    all over the place.<br/>
                How about an application that can help you keep organized?</h3>
                <p>First, you need to enter all your child's classmates and their contact info into the system.
                There will be a column with each child's contribution (or
                a spot to insert one if they haven't yet;), and a place to record all the collection calls or
                emails you have made to each parent. You can also view all of the collections on a separate page.
                Sounds good? Go right ahead and start with entering your child's classmates into the system.
                Good Luck!!!</p>
                <Link to="/addStudent">
                    <button className='btn btn-info'>Add Student</button>
                </Link>
                <br />
                Or, if you've already entered the names, and want to see the whole list, go to the
                <Link to='/studentstable'> students table.</Link>
            </div>
        )
    }
}
export default withRouter(HomePage);