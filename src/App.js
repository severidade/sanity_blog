import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './Reset.css';
import './App.css';
import Navbar from './componentes/Navbar';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';
import BlogPosts from './pages/BlogPosts';
import Projects from './pages/Projects';
import Error from './pages/Error';

export default function App(){
  return (
    <>
      <Navbar />
      <Switch>
        <Route  component={Home} exact path="/"/>
        <Route  component={SinglePost} path="/post/:slug" />
        <Route  component={BlogPosts} path="/post/" />
        <Route  component={Projects} path="/projects" />
        <Route  component={Error} path="*" />
      </Switch>
    </>
  );
}