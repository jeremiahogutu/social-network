import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {signin, authenticate} from "../auth";

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
        this.setState({loading: true});
        const {email, password} = this.state;
        const user = {
            email,
            password
        };
        signin(user).then(data => {
            if (data.error) this.setState({error: data.error, loading: false});
            else {
                // authenticate
                authenticate(data, () => {
                    this.setState({redirectToReferer: true})
                })

            }
        })
    };



    signInForm = (email, password, error) => (
            <div className="mdl-card mdl-shadow--16dp util-center util-spacing-h--40px" style={{margin: "0 auto"}}>
                <div className="mdl-card__title mdl-color--indigo">
                    <h2 className="mdl-card__title-text mdl-color-text--white">Login</h2>
                </div>
                <div className="mdl-card__supporting-text mdl-grid">
                    <b className="mdl-color-text--accent" style={{display: error ? "" : "none"}}>{error}</b>
                    <form>
                        <div
                            className="mdl-textfield mdl-js-textfield mdl-textfield">
                            <label className=""
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
                            className="mdl-textfield mdl-js-textfield mdl-textfield">
                            <label
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
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    );

    render() {
        const {email, password, error, redirectToReferer} = this.state;

        if (redirectToReferer) {
            return <Redirect to="/"/>
        }
        return (
            <div className='mdl-grid'>
                {this.signInForm(email, password, error)}
            </div>
    );
    }
}

export default Signin;