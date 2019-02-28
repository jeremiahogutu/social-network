import React, {Component} from 'react';

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: '',
            redirectToReferer: false
        }
    }

    // higher order function: A function that returns another function
    handleChange = userInput => event => {
        // clear old errors
        this.setState({error: ""});
        // we use array syntax to change values dynamically
        this.setState({[userInput]: event.target.value})
    };

    // handle submit
    onSubmit = event => {
        event.preventDefault();
        const {email, password} = this.state;
        const user = {
            email,
            password
        };
        this.signin(user).then(data => {
            if (data.error) this.setState({error: data.error});
            else {
                // authenticate and redirect

            }
        })
    };

    signin = user => {
        return fetch("http://localhost:3005/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json()
            })
            .catch(err => console.log(err))
    };

    signInForm = (email, password) => (
        <form className="ui form">
            <div className="field">
                <label>Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                />
            </div>
            <div className="field">
                <label>Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="text"
                    name="password"
                    placeholder="password"
                    value={password}
                />
            </div>
            <button onClick={this.onSubmit} className="ui button" type="submit">Submit</button>
        </form>
    );

    render() {
        const {email, password, error} = this.state;
        return (
            <div className='ui container'>
                <h2 className='ui center aligned header'>SignIn</h2>
                <div className="ui error message" style={{display: error ? "" : "none"}}>{error}</div>
                {this.signInForm(email, password)}
            </div>
        );
    }
}

export default Signin;