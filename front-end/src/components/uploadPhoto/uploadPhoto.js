import React, { Component } from 'react';
import accounticon from '../../Assets/accounticon.jpg'
import './uploadPhoto.css';

import { connect } from 'react-redux';
import { saveAvatar } from '../../actions';


class UploadPhoto extends Component {

    state = {
        avatar: accounticon
    }

    onChange(e) {
        let files = e.target.files;
        let reader = new FileReader();
        if (files.length === 0) {
            return
        }
        reader.readAsDataURL(files[0]); 
        reader.onload=(e)=> {
            this.setState({ avatar: e.target.result })     
        }   
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.saveAvatar(this.state);
    }

    render() {
        return (
            <div>
                <div className ="textcenter" onSubmit={this.onFormSubmit}>
                    <h4 className ="textcenter font"> Upload Profile Picture </h4>
                    <input type="file" name="file" id="file" className="nav-item inputfile" onChange={(e)=>this.onChange(e)}/>
                    <label className="nav-item select-file" for="file">Select a file</label>
                    <div >
                        <img className ="imgresize"  src={this.state.avatar} alt=""/>
                    </div>
                    <button 
                        className="btn btn-outline-success"
                        onClick={(e) => this.onSubmit(e)}>Submit</button>
                </div>
            </div>
        )
    }
}

const mapPropsToDispatch = dispatch => ({
    saveAvatar: (avatar) => dispatch(saveAvatar(avatar))
})

export default connect(null, mapPropsToDispatch)(UploadPhoto);
