import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { About } from './pages/About'
import { App } from './pages/App'
import { NotFound } from './pages/NotFound'

export const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header/>
      <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/about/" component={About}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </BrowserRouter>
)
