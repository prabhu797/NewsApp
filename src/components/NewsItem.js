import React, { Component } from 'react'

export class NewsItem extends Component {
    // constructor() {
    //     super();
    //     console.log("I am constructor from NewsItem Component."); // We can set state using constructor also. It is same as Java member initialization
    // }

  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className='container my-3'>
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt={imageUrl}/>
            <div className="card-body">
                <h5 className="card-title">{title} <small><span className="badge rounded-pill bg-success sm">{source}</span></small> </h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read mode...</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem