import React, {Component} from 'react';
import {list} from "./apiUser";

class Users extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data)
            } else {
                this.setState({
                    users: data
                })
            }
        })
    }

    render() {
        const {users} = this.state
        return (
            <div className="mdl-grid" style={{justifyContent: 'center'}}>
                <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
                    <h2>Users</h2>
                </div>
                <div className="mdl-cell mdl-cell--10-col mdl-cell--6-col-tablet mdl-cell--4-col-phone">
                    {users.map((user, i) => (
                        <div key={i}>
                            <p>{user.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Users;