import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getThreads } from '../../actions/index';
import Forumforms from './forumforms';

class Forum extends Component {
    state = {
        threads: []
    }

    componentDidMount() {
        this.props.getThreads();
    }


    render() {
        return (
            <div>
                {this.state.threads.map((thread, index) => {
                    return (
                        <div>{thread.title}</div>
                    )
                })
                }
                <Forumforms
                    addToThread={this.props.addToThread} />
            </div>
        );
    }
}
// const mapStateToProps = state => ({
//     threads: state
//   })
const mapDispatchToProps = dispatch => ({
    getThreads: () => dispatch(getThreads())
})

export default connect(null, mapDispatchToProps)(Forum);