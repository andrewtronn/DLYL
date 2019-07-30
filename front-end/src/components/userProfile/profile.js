import React, { Component } from 'react';
import { connect } from 'react-redux'
import './profile.css';
import UploadPhoto from '../uploadPhoto/uploadPhoto';

class Profile extends Component {
    state = {
        avatar: '',
        active_date: ''
    }

    getDate = () => {
        let date = this.props.users.creation_date.substring(0,4);
        return date;
    }

    render() {
        return (
            <div className="profile-container container">
                <div className="row1">
                    {this.props.users.avatar !== ""
                    ? <img classname="profile-pic" src={this.props.users.avatar}alt="profile" />
                    : <UploadPhoto /> }
                    <hr />
                    <h5>COMPANY</h5>
                    <p>{this.props.users.company_affiliation}</p>
                    <hr />
                    <h5>INDUSTRY</h5>
                    <p>{this.props.users.user_industry}</p>
                </div>
                <div className="row2">
                    <h2 id="namecss">{this.props.users.username}</h2>
                    <hr />
                    <h5>About</h5>
                    <p>Member since: {this.props.users.creation_date ? new Date(this.props.users.creation_date.toString()).getFullYear() : ""}</p>
                    <p>Email: {this.props.users.email} </p>
                    <p>Posts and replies: 12</p>
                    <p>Last log in: {this.props.users.active_date ? new Date(this.props.users.active_date.toString()).getMonth() + 1 + "/" + new Date(this.props.users.active_date.toString()).getFullYear() : ""} </p>
                    <hr />
                    <h5>Posts and Comments</h5>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.loggedUser
});

export default connect(mapStateToProps)(Profile);



