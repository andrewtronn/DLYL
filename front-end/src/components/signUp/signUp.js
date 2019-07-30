import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from '../../actions';
import LinkedInPage from './linkedinOauth';
import './newSignUp.css';

class SignUp extends Component {
    state = {
        user: {
            username: "",
            email: "",
            password: "",
            company_affiliation: "",
            user_industry: "",
            real_name: "",
            avatar: ""
        },
        confirmPassword: "",
        redirect: false,
        subscribed: true
    }
    
    matchPasswords = (e) => {
        e.preventDefault();
        if (this.state.user.password !== this.state.confirmPassword) {
            alert("Passwords don't match");
        } else {
            this.setState({ redirect: true });
            this.props.onAddUser(this.state.user)
            if (this.state.subscribed) {
                this.setState({email: this.state.user.email += "*"});
                this.props.onAddUser(this.state.user)
            }
        } 
    }

    render() {
        return (
            this.state.redirect
            ? <Redirect to='/profile'/>
            : (
            <div className="background-div">
                <div className="the-div-before-container">
                    <div className="container inner-div">
                        <div className="container">
                            <div className="row">
                                <div className="social-media col-md-4 flex-container">
                                    <h5>Use a social network to sign up</h5>
                                    <button
                                        id="facebook"
                                        className="btn btn-primary"
                                    onClick={this.match}
                                    >Sign in with Facebook</button>
                                    <button
                                        id="google"
                                        className="btn btn-primary"
                                        onClick={this.match}
                                    >Sign in with Google+</button>
                                    {/* <button
                                        id="linkedin"
                                        className="btn btn-primary"
                                        onClick={this.match}
                                    >Sign in with Linkedin</button> */}
                                    <LinkedInPage/>
                                    <button
                                        id="twitter"
                                        className="btn btn-primary"
                                        onClick={this.match}
                                    >Sign in with Twitter</button>
                                </div>
                                <form>
                                    <h3>&nbsp; Sign up to comment, write and receive news by email</h3>
                                    <div className="signUpForm">
                                        <div className="container">
                                            <div className="col-md-8">
                                                {/* Full Name */}
                                                <div>
                                                    <input
                                                        value={this.state.user.real_name}
                                                        onChange={e => this.setState({ ...this.state, user: { ...this.state.user, real_name: e.target.value} })}
                                                        type="text" className="form-control input" placeholder="Full Name" />
                                                </div>
                                                {/* Email */}
                                                <div>
                                                    <input
                                                        value={this.state.user.email}
                                                        onChange={e => this.setState({ ...this.state, user: { ...this.state.user, email: e.target.value } })}
                                                        type="email" className="form-control input" placeholder="Email address" />
                                                </div>
                                                {/* Company Affiliation */}
                                                <div>
                                                    <input
                                                        value={this.state.user.company_affiliation}
                                                        onChange={e => this.setState({ ...this.state, user: { ...this.state.user, company_affiliation: e.target.value } })}
                                                        type="text" className="form-control input" placeholder="Company Affiliation" />
                                                </div>
                                                {/* User Industry */}
                                                <div>
                                                    <input
                                                        value={this.state.user.user_industry}
                                                        onChange={e => this.setState({ ...this.state, user: { ...this.state.user, user_industry: e.target.value} })}
                                                        type="text" className="form-control input" placeholder="User Industry" />
                                                </div>
                                                {/* Username */}
                                                <input
                                                    value={this.state.username}
                                                    onChange={e => this.setState({ ...this.state, user: { ...this.state.user, username: e.target.value } })}
                                                    type="text" className="form-control input" placeholder="Username" />
                                                {/* Password */}

                                                <div className="HOTDOG">
                                                    <input
                                                        value={this.state.user.password}
                                                        onChange={e => this.setState({ ...this.state, user: { ...this.state.user, password: e.target.value } })}
                                                        type="password" className="form-control input col-md-5" placeholder="Password" /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                {/* Confirm Password */}
                                                    <input
                                                        value={this.state.confirmPassword}
                                                        onChange={e => this.setState({ confirmPassword: e.target.value })}
                                                        type="password" className="form-control input col-md-5" placeholder="Confirm Password" />
                                                </div>
                                                <input  type="checkbox" 
                                                checked={this.state.subscribed}
                                                onClick={() => this.setState({
                                                    subscribed: !this.state.subscribed
                                                })}
                                                />
                                                <label htmlFor="">Yes, I want to be subscribed to all newsletters</label>
                                            </div>
                                        </div>
                                        <button
                                            className="btn signUpButton"
                                            onClick={(e)=>this.matchPasswords(e)}
                                        >Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        );
    }
}
const mapStateToProps = state => ({
    logged: state.isLogged
});

const mapDispatchToProps = dispatch => ({
    onAddUser: (user) => (dispatch(addUser(user)))
});

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
