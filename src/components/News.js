import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles : [],
            loading: false,
            page: 1,
            num: 0,
        }
        let cat = this.capitalizeFirstLetter(this.props.category);
        document.title = `News 24*7 - ${cat === 'General'? 'Home' : cat}`
    }

    getApiKey = (num) => {
        this.setState({
            num: num,
        });
        const apiKeys = [process.env.REACT_APP_NEWS_API_1,process.env.REACT_APP_NEWS_API_2,process.env.REACT_APP_NEWS_API_3,process.env.REACT_APP_NEWS_API_4];
        let apiKey = apiKeys[num];
        return apiKey;
    }

    async fetchNews(page, num) {
        this.props.setProgress(10);
        let url;
        if(this.props.category === 'tech') {
            url = `https://api.thenewsapi.com/v1/news/top?api_token=${this.getApiKey(num)}&categories=${this.props.category}&exclude_categories=politics,food,travel,science,sports,business,health,entertainment,general&locale=in&limit=3&page=${page}`; 
        } else {
            url = `https://api.thenewsapi.com/v1/news/top?api_token=${this.getApiKey(num)}&categories=${this.props.category}&locale=in&limit=3&page=${page}`;
        }
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        if(Object.values(parsedData)[0].code === 'usage_limit_reached') {
            if(num < 3) {
                this.fetchNews(page, num + 1);
            } else {
                this.fetchNews(page, 0);
            }
        } else {
            this.setState({
                articles: Object.values(parsedData)[1],
                page: page,
                loading: false,
                num: num,
            });
        }
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.fetchNews(this.state.page,0);
    }
    
    handlePrevClick = async () => {
        this.fetchNews(this.state.page - 1,this.state.num);
    }

    handleNextClick = async () => {
        this.fetchNews(this.state.page + 1,this.state.num);
    }
    
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{marginTop: '90px'}}>News 24*7 - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row my-2">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4"  key={element.url}>
                    <NewsItem title={element.title? (element.title.slice(0, 47) + "...") : ""} description={element.description? (element.description.slice(0, 97) + "...") : ""} imageUrl={element.image_url? element.image_url : null} newsUrl={element.url} author={element.author? element.author : 'unknown'} date={element.published_at} source={element.source}/>
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