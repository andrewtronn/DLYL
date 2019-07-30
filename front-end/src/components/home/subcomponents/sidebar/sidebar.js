import React, { Component } from 'react';
import './sidebar.css';



class Sidebar extends Component {
    render() {
        return (
            <div id="sidebar-wrapper">
                <div className="section sidebar ready-widget ">
                    {/* FORUM POSTS */}
                    <div className="widget BlogArchive">
                        <div className="title-wrap">
                            <h2>Blog Archive
                            </h2>
                        </div>
                        <div className="widget-content">
                            <div id="ArchiveList">
                                <div id="BlogArchive1_ArchiveList">
                                    <ul className="hierarchy">
                                        <li className="archivedate expanded">
                                            <a className="toggle" href="javascript:void(0)">
                                                <span className="zippy toggle-open">
                                                    ▼&nbsp;
                                                </span>
                                            </a>
                                            <a className="post-count-link" href="http://newcon-themexpose.blogspot.com/2016/">2016
                                            </a>
                                            <span className="post-count" dir="ltr">(3)
                                            </span>
                                            <ul className="hierarchy">
                                                <li className="archivedate expanded">
                                                    <a className="toggle" href="javascript:void(0)">
                                                        <span className="zippy toggle-open">
                                                            ▼&nbsp;
                                                        </span>
                                                    </a>
                                                    <a className="post-count-link" href="http://newcon-themexpose.blogspot.com/2016/08/">August
                                                    </a>
                                                    <span className="post-count" dir="ltr">(1)
                                                    </span>
                                                    <ul className="posts">
                                                        <li>
                                                            <a href="http://newcon-themexpose.blogspot.com/2016/08/apples-new-ipad-lets-you-play-latest.html">Apple’s new ipad lets you play the latest games fo...
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="clear">
                                </div>
                            </div>
                            <span className="widget-item-control">
                                <span className="item-control blog-admin">
                                    <a className="quickedit" href="//www.blogger.com/rearrange?blogID=8905527896802939095&amp;widgetType=BlogArchive&amp;widgetId=BlogArchive1&amp;action=editWidget&amp;sectionId=sidebar2" onclick="return _WidgetManager._PopupConfig(document.getElementById(&quot;BlogArchive1&quot;));" rel="nofollow" target="configBlogArchive1" title="Edit">
                                        <img alt="" height="18" src="https://resources.blogblog.com/img/icon18_wrench_allbkg.png" width="18">
                                        </img>
                                    </a>
                                </span>
                            </span>
                            <div className="clear">
                            </div>
                        </div>
                    </div>
                    {/* LATESTS COMMENTS */}
                    <div className="widget HTML" data-version="1" id="HTML21">
                        {/* COMMENTS TITLE */}
                        <div className="title-wrap">
                            <h2 className="title">Comments
                            </h2>
                        </div>
                        {/* COMMENTS CONTENT */}
                        <div className="widget-content">
                            <ul className="cmm-widget">
                                <li>
                                    <div className="cmm-avatar">
                                        <img className="cmm-img img-effect" src="//lh3.googleusercontent.com/-uyUn8hX_aW0/AAAAAAAAAAI/AAAAAAAAAA0/9hiC3HeYpxQ/s512-c/photo.jpg"/>
                                    </div>
                                    <a href="http://newcon-themexpose.blogspot.com/2016/08/apples-new-ipad-lets-you-play-latest.html?showComment=1547819112431#c7809376617473255505">Hoang Long Nguyen
                                    </a>
                                    <span>"kgiffovorb ub bfb ob f "
                                    </span>
                                </li>
                            </ul>
                            <div className="clear">
                            </div>
                        </div>
                        <div className="clear">
                        </div>
                        <span className="widget-item-control">
                            <span className="item-control blog-admin">
                                <a className="quickedit" href="//www.blogger.com/rearrange?blogID=8905527896802939095&amp;widgetType=HTML&amp;widgetId=HTML21&amp;action=editWidget&amp;sectionId=sidebar2" onclick="return _WidgetManager._PopupConfig(document.getElementById(&quot;HTML21&quot;));" rel="nofollow" target="configHTML21" title="Edit">
                                    <img alt="" height="18" src="https://resources.blogblog.com/img/icon18_wrench_allbkg.png" width="18"/>
                                </a>
                            </span>
                        </span>
                        <div className="clear">
                        </div>
                    </div>
                </div>
            </div>
)}};
export default Sidebar;