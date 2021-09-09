import React, { Component } from 'react'
import NewsItem from './NewsItem';
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
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=481f4f13da2a4f6ba5bae19cac47e80f&page1&pageSize=6";
        let data=await fetch(url);
        let parsedData=await data.json();
        console.log(parsedData);
        this.setState({
            articles:parsedData.articles
        })
    }
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center text-danger">News King-Top Headlines</h1>
                <div className="row " > 
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4 my-3" key={element.url}>
                            <NewsItem title={element.title} description={element.description}
                            imageUrl={element.urlToImage}/>
                        </div>
                })}
                
                </div>
            </div>
        )
    }
}
