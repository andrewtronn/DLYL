import React, { Component } from 'react';
import './featured.css';
import { connect } from 'react-redux';
import { getArticles } from '../../../.././actions';



class Featured extends Component {
    state = {
        articles: null,
        comment: "",
        isParsed: false
    }

    componentDidMount() {
        this.setState({articles:this.props.articles})
        this.parseArticles();
    }


     parseArticles=()=>{

        for(var i = 0; i<this.props.articles.length;i++){
            //format dates
            var dates = this.props.articles[i].time.split("T");
            this.props.articles[i].time = dates[0];

            //format summary
            this.props.articles[i].summary = this.props.articles[i].summary.substring(0, 500) + "...";
            if(this.props.articles[i].summary === "..."){
                this.props.articles[i].summary = "No summary available, click to read more..."
            }
             // format html
            let summary = new DOMParser().parseFromString(this.props.articles[i].summary, 'text/html');
            let s = summary.getElementsByTagName('body');
            let string = [].map.call(s, function(node) {
                return node.textContext || node.innerText || "";
            }).join();
            this.props.articles[i].summary = string;
        }
        this.setState({ isParsed: true })
    }

    render() {
        return (
            <div className="container" id="main-wrapper">
                <div className="posts-title">
                    <h2>
                        <a href="/search?&amp;max-results=10">Recent Featured Posts</a>
                    </h2>
                </div>
                <div className="main section" id="main" name="Main Posts">
                    <div className="widget Blog" data-version="1" id="Blog1">
                        <div className="blog-posts hfeed">

                            <div className="post-outer">
                                {
                                    this.state.articles && this.state.isParsed && (
                                        
                                        this.state.articles.map((article, index) => {
                                            return (
                                                <div className="post">

                                                    <div className="post-header">
                                                    </div>
                                                    <article>
                                                        <font className="retitle">
                                                            <h2 className="post-title entry-title">
                                                                <a href={article.article_link}>
                                                                    {article.title}
                                                                </a>
                                                            </h2>
                                                        </font>
                                                        <div className="date-header">
                                                            <div id="meta-post">
                                                                <a className="timestamp-link" href="http://newcon-themexpose.blogspot.com/2016/08/apples-new-ipad-lets-you-play-latest.html" rel="bookmark" title="permanent link">
                                                                    <abbr className="published" itemprop="datePublished dateModified" title="2016-08-01T04:22:00-07:00">{article.time}
                                                                    </abbr>
                                                                </a>
                                                            </div>
                                                            <div className="resumo">
                                                                <span>
                                                                    {article.summary}
                                                                </span>
                                                                <a className="read-more" href={article.article_link}>Read More
                                                                </a>
                                                                <br/>
                                                            </div>
                                                            <div className="clear">
                                                            </div>
                                                        </div>
                                                    </article>

                                                    <div className="clear">
                                                    </div>
                                                    <div className="post-footer">
                                                    </div>

                                                </div>
                                            )
                                        })
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => ({
    articles: state.articles,
});


export default connect(mapStateToProps, null)(Featured);
