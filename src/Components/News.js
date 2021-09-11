import React, { Component } from 'react'
import NewsItem from './NewsItem';
import PrevNextBtns from './PrevNextBtns';
import Spinner from './Spinner';
export default class News extends Component {

    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }
   
    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=481f4f13da2a4f6ba5bae19cac47e80f&page=1&pageSize=6";
        this.setState({
            loading:true
        });
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            loading:false
        })
    }
    handleprevClick=async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=481f4f13da2a4f6ba5bae19cac47e80f&page=${this.state.page-1}&pageSize=6`;
        this.setState({
            loading:true
        });
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({
            articles:parsedData.articles ,
            page:this.state.page-1,
            loading:false
        })
    }
    handlenextClick=async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=481f4f13da2a4f6ba5bae19cac47e80f&page=${this.state.page+1}&pageSize=6`;
        this.setState({
            loading:true
        });
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({
            articles:parsedData.articles ,
            page:this.state.page+1,
            loading:false
        })
    }
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center text-danger">News King-Top Headlines</h1>
                {this.state.loading&&<Spinner/>}
                {!this.state.loading&&<PrevNextBtns 
                handleprevClick={this.handleprevClick}
                handlenextClick={this.handlenextClick}    
                page={this.state.page}
                />}
                <div className="row " > 
                {!this.state.loading&&this.state.articles.map((element)=>{
                    return <div className="col-md-4 my-3" key={element.url}>
                            <NewsItem title={element.title} description={element.description}
                            imageUrl={element.urlToImage} 
                            url={element.url}
                            />
                        </div>
                })}
                <PrevNextBtns 
                handleprevClick={this.handleprevClick}
                handlenextClick={this.handlenextClick}    
                page={this.state.page}
                />
                </div>
            </div>
        )
    }
}
