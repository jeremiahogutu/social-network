import React, {Component} from 'react';
import {signup} from "../auth";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
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
        const {name, email, password} = this.state;
        const user = {
            name,
            email,
            password
        };
        signup(user).then(data => {
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



    signUpForm = (name, email, password, error) => (
        <div className="mdl-card mdl-shadow--16dp util-center util-spacing-h--40px" style={{margin: "0 auto"}}>
            <div className="mdl-card__title mdl-color--indigo">
                <h2 className="mdl-card__title-text mdl-color-text--white">SignUp</h2>
            </div>
            <div className="mdl-card__supporting-text mdl-grid">
                <b className="mdl-color-text--accent" style={{display: error ? "" : "none"}}>{error}</b>
                <form>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield">
                        <label
                               htmlFor="textfield_username">Name</label>
                        <input
                            onChange={this.handleChange("name")}
                            className="mdl-textfield__input"
                            type="text"
                            id="textfield_name"
                            name="name"
                            value={name}
                        />
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield">
                        <label htmlFor="textfield_username">Email</label>
                        <input
                            onChange={this.handleChange("email")}
                            className="mdl-textfield__input"
                            type="email"
                            id="textfield_email"
                            name="email"
                            value={email}
                        />
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield">
                        <label htmlFor="textfield_password">Password</label>
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
        const {name, email, password, error, signUpSuccess} = this.state;
        return (
            <div className='mdl-grid mdl-grid--no-spacing' style={{display: 'flex', justifyContent: 'center'}}>
                <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone" style={{display: signUpSuccess ? "flex" : "none", justifyContent: 'center', padding: '20px 0'}}>New account is successfully created. Please sign in</div>
                <div className="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone">
                    {this.signUpForm(name, email, password, error)}
                </div>
            </div>
        );
    }
}

export default Signup;