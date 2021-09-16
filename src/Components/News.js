import React, { Component } from 'react';
import NewsItem from './NewsItem';
// import PrevNextBtns from './PrevNextBtns';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    static defaultProps={
        country:"in",
        category:"general",
        pageSize:6
    }
    static propTypes={
        country:PropTypes.string,
        category:PropTypes.string,
        pageSize:PropTypes.number
    }
    capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalPageResults:0
        }
        document.title=`HV News-${this.props.category}`;
    }
    async updateNews(){
        this.props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(30);
        let data=await fetch(url);
        this.props.setProgress(50);
        let parsedData=await data.json();
        console.log(parsedData);
        this.props.setProgress(60);
        this.setState({
            articles:parsedData.articles,
            loading:false,
            totalPageResults: parsedData.totalResults
        })
        this.props.setProgress(100);
    }
    async componentDidMount(){
        this.updateNews();
    }
    handleprevClick=async()=>{
        this.setState({
            page:this.state.page-1
        });
        this.updateNews();
    }
    handlenextClick=async()=>{
        this.setState({
            page:this.state.page+1
        });
        this.updateNews();
    }
    fetchData=async()=>{
        this.setState({page:this.state.page+1});
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalPageResults: parsedData.totalResults
        })
    }
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center text-primary" style={{margin:'70px 0 20px 0'}}>HV News Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {/* {this.state.loading&&<Spinner/>} */}
                <div className="row " > 
                <InfiniteScroll
                dataLength={this.state.articles.length} //This is important field to render the next data
                next={this.fetchData}
                hasMore={this.state.articles.length!==this.state.totalPageResults}
                loader={<Spinner/>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>You have seen it all</b>
                    </p>
                }
                >
                {!this.state.loading&&this.state.articles.map((element)=>{
                    return <div className="col-md-4 my-3" key={element.url}>
                            <NewsItem title={element.title} description={element.description}
                            imageUrl={element.urlToImage} 
                            url={element.url}
                            author={element.author}
                            date={element.publishedAt}
                            source={element.source.name}
                            />
                        </div>
                })}
                </InfiniteScroll>
                {/* <PrevNextBtns 
                handleprevClick={this.handleprevClick}
                handlenextClick={this.handlenextClick}    
                page={this.state.page}
                totalPages={this.state.totalPageResults}
                /> */}
                </div>
            </div>
        )
    }
}
