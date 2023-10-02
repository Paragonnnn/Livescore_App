import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './app.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Leagues from './components/Leagues.jsx'
import Countries from './components/Countries.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <App />

    </BrowserRouter>
  </>
)
