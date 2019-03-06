import React, {Component} from 'react';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: '',
            signUpSuccess: false
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
        this.signup(user).then(data => {
            if (data.error) this.setState({error: data.error});
            else
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    signUpSuccess: true
                })
        })
    };

    signup = user => {
        return fetch("http://localhost:3005/signup", {
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

    signUpForm = (email, password, error) => (
        <div className="mdl-card mdl-shadow--16dp util-center util-spacing-h--40px" style={{margin: "0 auto"}}>
            <div className="mdl-card__title mdl-color--blue-900">
                <h2 className="mdl-card__title-text mdl-color-text--white">SignUp</h2>
            </div>
            <div className="mdl-card__supporting-text mdl-grid">
                <b className="mdl-color-text--accent" style={{display: error ? "" : "none"}}>{error}</b>
                <form>
                    <div
                        className="mdl-textfield mdl-js-textfield mdl-textfield mdl-cell mdl-cell--12-col">
                        <label className="mdl-textfield__label mdl-color-text--grey"
                               htmlFor="textfield_username">Email</label>
                        <input
                            onChange={this.handleChange("email")}
                            className="mdl-textfield__input"
                            type="email"
                            id="textfield_username"
                            name="email"
                            value={email}
                        />
                    </div>
                    <div
                        className="mdl-textfield mdl-js-textfield mdl-textfield mdl-cell mdl-cell--12-col">
                        <label className="mdl-textfield__label mdl-color-text--grey"
                               htmlFor="textfield_password">Password</label>
                        <input
                            className="mdl-textfield__input"
                            onChange={this.handleChange("password")}
                            type="password"
                            id="textfield_password"
                            name="password"
                            value={password}
                        />
                    </div>
                    <div className="mdl-cell mdl-cell--12-col send-button" align="center">
                        <button
                            onClick={this.onSubmit}
                            type="submit"
                            className="mdl-button mdl-js-ripple-effect mdl-js-button mdl-button--raised mdl-button--colored mdl-color--primary"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    render() {
        const {email, password, error, signUpSuccess} = this.state;
        return (
            <div className='mdl-grid'>
                <div className="ui positive message" style={{display: signUpSuccess ? "" : "none"}}>New account is successfully created. Please sign in</div>
                {this.signUpForm(email, password, error)}
            </div>
        );
    }
}

export default Signup;