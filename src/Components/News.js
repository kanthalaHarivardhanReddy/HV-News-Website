import React, { Component } from 'react'
import NewsItem from './NewsItem';
import PrevNextBtns from './PrevNextBtns';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

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
            loading:false,
            page:1,
            totalPageResults:0
        }
        document.title=`${this.props.category} -HV news`;
    }
    async updateNews(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=481f4f13da2a4f6ba5bae19cac47e80f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        });
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            loading:false,
            totalPageResults: parsedData.totalResults
        })
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
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center text-danger">HV News-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading&&<Spinner/>}
                {!this.state.loading&&<PrevNextBtns 
                handleprevClick={this.handleprevClick}
                handlenextClick={this.handlenextClick}    
                page={this.state.page}
                totalPages={this.state.totalPageResults}
                />}
                <div className="row " > 
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
                <PrevNextBtns 
                handleprevClick={this.handleprevClick}
                handlenextClick={this.handlenextClick}    
                page={this.state.page}
                totalPages={this.state.totalPageResults}
                />
                </div>
            </div>
        )
    }
}
