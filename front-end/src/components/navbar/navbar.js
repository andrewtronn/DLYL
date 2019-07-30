import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './navbar.css';
import { logoutUser } from '../../actions';
import LogoLogo from './../logo/logo';


class Navbar extends Component {

    render() {
        return (
            <div className="nav-container">
                <nav className="main-nav">
                    <Link id="logo-hover" to="/"><LogoLogo /></Link>
                    <Link className="nav-item" to="/">Home</Link>
                    {this.props.logged
                        ?
                        <Link
                            className="nav-item logout"
                            to="/"
                            onClick={() => this.props.logout(this.props.user, this.props.user.user_id)}>Logout
                                </Link>
                        :
                        <div className="main-nav">
                            <Link className="nav-item" to="/login">Login</Link>
                            <Link className="nav-item" to="/signup">Signup </Link>
                            <Link className="nav-item" to="/forum"> Forum </Link>
                        </div>

                    }
                </nav>
            </div>
        )
    };
}

const mapStateToProps = state => ({
    user: state.loggedUser,
    logged: state.isLogged
});

const mapPropsToDispatch = dispatch => ({
    logout: (user, id) => dispatch(logoutUser(user, id))
})

export default connect(mapStateToProps, mapPropsToDispatch)(Navbar);