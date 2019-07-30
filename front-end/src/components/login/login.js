import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUserToken } from '../../actions';
import './login.css';

class LogInForm extends Component {
    state = {
        username: '',
        password: '',
        logged: false
    }

    onLogIn = e => {
        e.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.logIn(user);
    }

    render() {
        return (
            this.props.isLogged
            ? 
            <Redirect to='/profile'/>
            : (
            <div className="loginBackground">
                <div className="loginOverlay">
                    <div className="container inputButtonCombo">
                        <h4 id="loginHeader">Log In</h4>
                        <form className="loginForm">
                            <div className="form-group">
                                <input  
                                    type="text" 
                                    className="form-control loginWidth loginInput" 
                                    placeholder="Username" 
                                    value={this.state.username}
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                    />
                            </div>
                            <div className="form-group">
                                <input  
                                    type="password" 
                                    className="form-control loginWidth loginInput"  
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                />
                            </div>
                            <button 
                                className="btn btn-primary loginButton"
                                onClick={(e) => this.onLogIn(e)}
                                >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            )
        );
    }
}

const mapStateToProps = state => ({
    user: state.loggedUser,
    isLogged: state.isLogged
});

const mapPropsToDispatch = dispatch => ({
    logIn: user => (dispatch(getUserToken(user)))
});

export default connect(mapStateToProps, mapPropsToDispatch)(LogInForm);