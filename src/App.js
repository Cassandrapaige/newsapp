import React, {useState, useEffect} from 'react'
import axios from 'axios'

import './App.scss'
import {API_KEY} from './base'

const App = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('donald-trump')
  const [isLoading, setIsLoading] = useState(false)
  const [articleNum, setArticleNum] = useState(0)
  const [value, setValue] = useState('')
  const [url, setUrl] = useState(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)

  useEffect(() => {
    setIsLoading(true)
    axios.get(url)
    .then(result => {
      setData(result.data.articles[articleNum])
      setIsLoading(false)
    }).catch(error => console.log(error))
  }, [articleNum])

  const handleClick = type => {
    if(type === 'prev') setArticleNum(prevNum => prevNum - 1);
    if(type === 'next') setArticleNum(prevNum => prevNum + 1)
    if(articleNum === 9 && type === 'next') setArticleNum(0)
    if(articleNum === 0 && type === 'prev') setArticleNum(9)
  }

  const handleSubmit = event => {
      event.preventDefault()
      setQuery(value);
      // event.target.reset()
  }

  const handleInput = event => {
    setValue(event.target.value)
  }
  
  return (
    <div className="container">
      <div className="search-input">
        <form onSubmit = {handleSubmit}>
          <input type="text" onChange = {handleInput} value={value} placeholder= '&#xF002; set(query)'/>
        </form>
      </div>
        <div className = 'article'>
          <h1>{data.title}</h1>
            <img src={data.urlToImage} alt=""/>
            <span>{data.publishedAt}</span>
            <p>{data.description}</p>
            <a href= {data.url} target='_blank' rel="noopener noreferrer">Read Story</a>

            <div className="buttons">
              <button 
                className = 'prev-btn' 
                onClick = {() => {handleClick('prev')}}>
                Previous article
              </button>
              <button 
                className = 'next-btn' 
                onClick = {() => {handleClick('next')}}>
                Next article
              </button>
            </div>
        </div>
    </div>
  )}

export default App;
