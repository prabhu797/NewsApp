import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string.isRequired,
        pageSize: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
    }

    constructor() {
        super();
        //  "I am constructor from News Component.");
        this.state = {
            articles : [],
            loading: false,
            page: 1
        }
    }

    async fetchNews(page) {
        let api = `pUXjRGO4D6MdpptvWXAkzGFJ6ApKorjfOCiVuHX6`
        let url;
        if(this.props.category === 'tech') {
            url = `https://api.thenewsapi.com/v1/news/top?api_token=${api}&categories=${this.props.category}&exclude_categories=politics,food,travel,science,sports,business,health,entertainment,general&locale=in&limit=3&page=${page}`; 
        } else {
            url = `https://api.thenewsapi.com/v1/news/top?api_token=${api}&categories=${this.props.category}&locale=in&limit=3&page=${page}`;
        }
        console.log(url);
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: Object.values(parsedData)[1],
            page: page,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    async componentDidMount() {
        this.fetchNews(this.state.page);
    }
    
    handlePrevClick = async () => {
        this.fetchNews(this.state.page - 1);
    }

    handleNextClick = async () => {
        this.fetchNews(this.state.page + 1);
    }
    
  render() {
    let noImage = "https://i0.wp.com/www.alphr.com/wp-content/uploads/2018/08/How-to-fix-the-Lenovo-webcam-not-working-issue1.jpg?resize=738%2C320&ssl=1";
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News 24*7 - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row my-2">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4"  key={element.url}>
                    <NewsItem title={element.title? (element.title.slice(0, 47) + "...") : ""} description={element.description? (element.description.slice(0, 97) + "...") : ""} imageUrl={element.image_url? element.image_url : noImage} newsUrl={element.url} author={element.author? element.author : 'unknown'} date={element.published_at} source={element.source}/>
                </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News