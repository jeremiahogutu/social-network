import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: '',
            redirectToReferer: false,
            loading: false
        }
    }

    // higher order function: A function that returns another function
    handleChange = userInput => event => {
        // clear old errors
        this.setState({error: ""});
        // we use array syntax to change values dynamically
        this.setState({[userInput]: event.target.value})
    };

    authenticate = (jwt, next) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(jwt));
            next()
        }
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
        this.signin(user).then(data => {
            if (data.error) this.setState({error: data.error, loading: false});
            else {
                // authenticate
                this.authenticate(data, () => {
                    this.setState({redirectToReferer: true})
                })

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
        <div className="mdl-grid">
            <div className="mdl-card mdl-shadow--16dp util-center util-spacing-h--40px">
                <div className="mdl-card__title mdl-color--orange-800">
                    <h2 className="mdl-card__title-text mdl-color-text--white">User Login</h2>
                </div>
                <div className="mdl-card__supporting-text mdl-grid">
                    <b className="mdl-color-text--accent">Error message goes here</b>
                    <form>
                        <div
                            className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
                            <label className="mdl-textfield__label mdl-color-text--grey"
                                   htmlFor="textfield_username">Email</label>
                            <input
                                onChange={this.handleChange("email")}
                                className="mdl-textfield__input"
                                type="email"
                                id="textfield_username"
                                name="email"
                                placeholder="Email"
                                value={email}
                            />
                        </div>
                        <div
                            className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--12-col">
                            <label className="mdl-textfield__label mdl-color-text--grey"
                                   htmlFor="textfield_password">Password</label>
                            <input
                                className="mdl-textfield__input"
                                onChange={this.handleChange("password")}
                                type="password"
                                id="textfield_password"
                                name="password"
                                placeholder="password"
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
        </div>
    );

    render() {
        const {email, password, error, redirectToReferer, loading} = this.state;

        if (redirectToReferer) {
            return <Redirect to="/"/>
        }
        return (
            <div className='ui container'>
                <h2 className='ui center aligned header'>SignIn</h2>
                <div className="ui error message" style={{display: error ? "" : "none"}}>{error}</div>
                {this.signInForm(email, password)}
                {
                    loading ? (
                        <div className="ui message">
                            <h2>loading...</h2>
                        </div>) : ("")
                }
            </div>
    );
    }
}

export default Signin;