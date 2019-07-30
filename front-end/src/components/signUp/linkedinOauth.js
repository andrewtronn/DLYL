import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import { getLinkedInToken } from './../../actions/index';

class LinkedInPage extends Component {
    state = {
      code: '',
      errorMessage: '',
    };
  
  
    handleSuccess = (data) => {
      this.setState({
        code: data.code,
        errorMessage: '',
      });
      this.props.getLinkedInToken(data.code)
    }
  
    handleFailure = (error) => {
      this.setState({
        code: '',
        errorMessage: error.errorMessage,
      });
    }
    
    render() {
      const { code, errorMessage } = this.state;
      return (
        <div>
          <LinkedIn
            clientId="86aojroi51e35k"// test clientId: 81lx5we2omq9xh 
            onFailure={this.handleFailure}
            onSuccess={this.handleSuccess}
            redirectUri="http://localhost:3000/linkedin/"
          >
            {/* <img src={require('./../../Assets/linkedin.png')} alt="Log in with Linked In" style={{ maxWidth: '180px' }} /> */}
          </LinkedIn>
          {!code && <div>No code</div>}
          {code && <div>Code: {code}</div>}
          {errorMessage && <div>{errorMessage}</div>}
        </div>
      );
    }
  }

  const mapDispatchToProps = dispatch => ({
      getLinkedInToken: (code) => (dispatch(getLinkedInToken(code)))
  })
  
  export default connect(null, mapDispatchToProps)(LinkedInPage);