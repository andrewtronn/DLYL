import React, { Component } from 'react';
import './home.css';
import Featured from './subcomponents/featured/featured.js';
import Sidebar from './subcomponents/sidebar/sidebar.js';



class Home extends Component {
    render() {
        return (
            <div className="row" id="content-wrapper">
                    <div className="clear">
                    </div>
                    <Featured />
                    {/* <Sidebar /> */}
                    <div className="clear">
                    </div>                  
            </div>
        );
    }
}

export default Home;
