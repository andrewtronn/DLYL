import React, { Component } from 'react';
import { addThread } from '../../actions/index';
import { connect } from 'react-redux';


class ForumForms extends Component {
    state = {
        title: "",
        body: ""
    }

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    onBodyChange = (e) => {
        this.setState({
            body: e.target.value
        })
    }
    onClick = (e) => {
        e.preventDefault();
        this.props.addThread(this.state);
        console.log(this.state.title)
        this.setState ({
            title: "",
            body: ""
        })
    }

    
    render() {
        return (
            <div>
                Title:
                <input type="text" className="form-control" value={this.state.title} onChange={this.changeTitle}></input>
                Body:
                <textarea className="form-control" rows="5" value={this.state.body} onChange={this.onBodyChange}></textarea>
                <input type="submit" className="btn btn-info" value="Save" onClick={this.onClick} />

            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    addThread: thread => dispatch(addThread(thread))
})

export default connect(null, mapDispatchToProps)(ForumForms);