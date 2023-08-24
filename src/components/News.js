import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

const News = (props) => {

    let capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [num, setNum] = useState(0);

    let getApiKey = (i) => {
        setNum(i);
        const apiKeys = [process.env.REACT_APP_NEWS_API_1,process.env.REACT_APP_NEWS_API_2,process.env.REACT_APP_NEWS_API_3,process.env.REACT_APP_NEWS_API_4];
        let apiKey = apiKeys[i];
        return apiKey;
    }

    let fetchNews = async (page, index) => {
        props.setProgress(10);
        let url;
        if(props.category === 'tech') {
            url = `https://api.thenewsapi.com/v1/news/top?api_token=${getApiKey(index)}&categories=${props.category}&exclude_categories=politics,food,travel,science,sports,business,health,entertainment,general&locale=in&limit=3&page=${page}`; 
        } else {
            url = `https://api.thenewsapi.com/v1/news/top?api_token=${getApiKey(index)}&categories=${props.category}&locale=in&limit=3&page=${page}`;
        }
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(25);
        let parsedData = await data.json();
        props.setProgress(40);
        if(Object.values(parsedData)[0].code === 'usage_limit_reached') {
            if(index < 3) {
                setNum(index + 1);
            } else {
                setNum(0);
            }
        } else {
            props.setProgress(70);
            setArticles(Object.values(parsedData)[1]);
            setPage(page);
            setLoading(false);
            props.setProgress(100);
        }
    }

    useEffect(() => {
        fetchNews(page, num);
        let cat = capitalizeFirstLetter(props.category);
        document.title = `News 24*7 - ${cat === 'General'? '' : cat}`;// eslint-disable-next-line
    }, [num])
    
    
    let handlePrevClick = async () => {
        fetchNews(page - 1,num);
    }

    let handleNextClick = async () => {
        fetchNews(page + 1,num);
    }

    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{marginTop: '90px', color: props.mode? 'white' : 'black'}}>News 24*7 - Top {capitalizeFirstLetter(props.category === 'general'? '' : props.category)} Headlines</h1>
        {loading && <Spinner mode={props.mode}/>}
        <div className="row my-2">
            {!loading && articles.map((element)=>{
                return <div className="col-md-4"  key={element.url}>
                    <NewsItem title={element.title? (element.title.slice(0, 47) + "...") : ""} description={element.description? (element.description.slice(0, 97) + "...") : ""} imageUrl={element.image_url? element.image_url : null} newsUrl={element.url} author={element.author? element.author : 'unknown'} date={element.published_at} source={element.source} mode={props.mode}/>
                </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
            <button disabled={false} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
}

News.defaultProps = {
    country: 'in',
    category: 'general',
    mode: false,
}

News.propTypes = {
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    mode: PropTypes.bool.isRequired,
}

export default News