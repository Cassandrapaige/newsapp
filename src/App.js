import React, {useState, useEffect} from 'react'
import axios from 'axios'

import './App.scss'
import {API_KEY} from './base'

import placeholder from './images/placeholder.jpg'

const App = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('whales')
  const [isLoading, setIsLoading] = useState(false)
  const [articleNum, setArticleNum] = useState(0)
  const [value, setValue] = useState('')

  useEffect(() => {
    setIsLoading(true)
    axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
    .then(result => {
      setData(result.data.articles[articleNum])
      setIsLoading(false)
    }).catch(error => console.log(error))
  }, [articleNum, query])

  const handleClick = type => {
    if(type === 'prev') setArticleNum(prevNum => prevNum - 1);
    if(type === 'next') setArticleNum(prevNum => prevNum + 1)
    if(articleNum === 9 && type === 'next') setArticleNum(0)
    if(articleNum === 0 && type === 'prev') setArticleNum(9)
  }

  const handleSubmit = event => {
      event.preventDefault()
      setQuery(value);
      setValue('')
  }

  const handleInput = event => {
    setValue(event.target.value)
  }
  
  const getDate = date => {
    let dateString = '';
    dateString += date
    let splitDate = dateString.split('T');
    let getDate = splitDate[0];
    const newDate = new Date(getDate);
    return newDate.toDateString()
  }

  return (
    <div className='container'>
        <div className = 'article'>
          <div className='search-input'>
            <form onSubmit = {handleSubmit}>
              <input type='text' onChange = {handleInput} value={value} placeholder= '&#xF002; set(query)'/>
            </form>
        </div>
      <div className="content">
          <h1>{data.title}</h1>
         { data.urlToImage !== '' ? 
            <img src={data.urlToImage} alt={data.title}/>
            : <img src={placeholder} alt='placeholder image of man reading newspaper'/> }
            <span>{getDate(data.publishedAt)}</span>
            <p>{data.description}</p>
            <a href= {data.url} target='_blank' rel='noopener noreferrer'>Read Story</a>
        </div>
            <div className='buttons'>
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
