import React, { Component } from 'react';
import './logo.css';
import Logo from './../../Assets/LogoInvert.png';


class LogoLogo extends Component {
    render() {
        return (
            <div id ="header-blog">
                <div className="header-content row">
                    <div className="header-logo">
                        <div className="section">
                            <div className="widget Header">
                                <div className="header-inner">
                                    <img src={Logo} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogoLogo;