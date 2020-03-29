import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.scss'

const App = () => {
  const [data, setData] = useState([])
  const [article, setArticle] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [articleNum, setArticleNum] = useState(0)
  const [url, setUrl] = useState(
    'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=4792a2b1fc8446f094c1d461b6330502')

  useEffect(() => {
    setIsLoading(true)
    axios.get(url)
    .then(result => {
      setData(result.data.articles[articleNum])
      setIsLoading(false)
    }).catch(error => console.log(error))
  }, [articleNum])

  const handleClick = () => {
    if(articleNum == 9) {
      setArticleNum(0)
    }
    setArticleNum(prevNum => prevNum + 1)
  }
  
  return (
    <div className="App">
        <div className = 'article'>
          <h1>{data.title}</h1>
          <span>{data.publishedAt}</span>
          <img src={data.urlToImage} alt=""/>
          <h2>{data.description}</h2>
          <a href= {data.url} target='_blank' rel="noopener noreferrer">Read Story</a>
        </div>

        <button onClick = {handleClick}>Next article</button>
    </div>
  )}

export default App;
