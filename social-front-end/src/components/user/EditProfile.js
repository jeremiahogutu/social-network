import React, {Component} from 'react';
import {isAuthenticated} from "../auth";
import {read, update} from "./apiUser";
import {Redirect} from "react-router-dom";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            name: '',
            email: '',
            password: '',
            redirectToProfile: false
        }
    }
    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token)
            .then(data => {
                if (data.error) {
                    this.setState({
                        redirectToProfile: true
                    })
                } else {
                    this.setState({
                        id: data._id,
                        name: data.name,
                        email: data.email,
                        error: ''
                    })
                }
            })
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId)
    }

    // higher order function: A function that returns another function
    handleChange = userInput => event => {
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
            password: password || undefined
        };
        // console.log(user)
        const userId = this.props.match.params.userId;
        const token = isAuthenticated().token;

        update(userId, token, user).then(data => {
            if (data.error) this.setState({error: data.error});
            else
                this.setState({
                    redirectToProfile: true
                })
        })
    };

    signUpForm = (name, email, password, error) => (
        <div className="mdl-card mdl-shadow--16dp util-center util-spacing-h--40px" style={{margin: "0 auto"}}>
            <div className="mdl-card__title mdl-color--indigo">
                <h2 className="mdl-card__title-text mdl-color-text--white">Edit Profile</h2>
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
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    render() {
        const {id, name, email, password, redirectToProfile } = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`}/>
        }
        return (
            <div className='mdl-grid' style={{marginTop: '30px'}}>
                {/*<h2>Edit Profile</h2>*/}

                {this.signUpForm(name, email, password)}
            </div>
        );
    }
}

export default EditProfile;