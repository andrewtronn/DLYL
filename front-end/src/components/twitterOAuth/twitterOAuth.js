import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth/lib/react-twitter-auth-component.js';

class TwitterOAuth extends Component {

  twitterResponse = (response) => {
        const token = response.headers.get('x-auth-token');
        console.log({accessToken: token});
        response.json().then(user => {
            if (token) {
                this.setState({isAuthenticated: true, user, token});
            }
        });
    };

  onFailed(error) {
    alert(error);
  }

  render() {
    const customHeader = {};
    customHeader['Test'] = 'test-header';
    return (
      <div>
        <TwitterLogin loginUrl="http://localhost:3000/twitter"
                      onFailure={this.onFailed}
                      onSuccess={this.twitterResponse}
                      requestTokenUrl="https://api.twitter.com/oauth/request_token"
                      showIcon={true}
                      customHeaders={customHeader}
                      />

        {/* <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
                      onFailure={this.onFailed}
                      onSuccess={this.onSuccess}
                      requestTokenUrl="https://api.twitter.com/oauth/request_token"
                      showIcon={true}
                      customHeaders={customHeader}>
          <b>Custom</b> Twitter <i>Login</i> content
        </TwitterLogin> */}
      </div>
    );
  }
}

export default TwitterOAuth;