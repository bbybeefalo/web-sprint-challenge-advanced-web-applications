import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'
import { axiosWithAuth } from '../axios'


const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { /* ✨ implement */ }
  const redirectToArticles = () => { /* ✨ implement */ }

  const logout = () => {
    localStorage.removeItem('token');
    setMessage('Goodbye!');
    navigate('/');
  }

  const login = (username, password) => {
    setSpinnerOn(true);
    setMessage('');
    axios.post(loginUrl, { 'username': username, 'password': password })
      .then(res => {
        setMessage(res.data.message);
        localStorage.setItem('token', res.data.token);
        setSpinnerOn(false);
        navigate('articles');
      })
      .catch(err => {
        console.log(err.response.data.message);
      })
  }

  const getArticles = () => {
    setSpinnerOn(true)
    axiosWithAuth().get(articlesUrl)
      .then(res => {
        setMessage(res.data.message);
        setArticles([...res.data.articles]);
        setSpinnerOn(false);
      })
      .catch(err => {
        console.log(err);
        navigate('/');
      })
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
  }

  const postArticle = article => {
    setSpinnerOn(true);
    axiosWithAuth().post(articlesUrl, article)
      .then(res => {
        console.log(res);
        setSpinnerOn(false);
        setMessage(res.data.message);
      })
      .catch(err => {
        console.log(err);
        setSpinnerOn(false)
      })

    axiosWithAuth().get(articlesUrl)
      .then(res => {
        setArticles([...res.data.articles])
      })
      .catch(err => {
        console.log(err)
      })
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = ({ article_id, article }) => {

    // ✨ implement
    // You got this!
  }

  const deleteArticle = art_id => {
    setSpinnerOn(true);
    axiosWithAuth().delete('http://localhost:9000/api/articles/' + art_id)
      .then(res => {
        console.log(res);
        setMessage(res.data.message);
        setSpinnerOn(false);
      })
      .catch(err => {
        console.log(err);
        setSpinnerOn(false)
      })

      axiosWithAuth().get(articlesUrl)
      .then(res => {
        setArticles([...res.data.articles])
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn} />
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="articles" element={
            <>
              <ArticleForm
                articles={articles}
                getArticles={getArticles} postArticle={postArticle} updateArticle={updateArticle} setCurrentArticleId={setCurrentArticleId} currentArticle={currentArticleId} setArticles={setArticles} />
              <Articles setArticles={setArticles} getArticles={getArticles} articles={articles} deleteArticle={deleteArticle} setCurrentArticleId={setCurrentArticleId} currentArticleId={currentArticleId} />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
