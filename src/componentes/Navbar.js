import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return(
    <header>
      <div>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/post">Blog Posts</NavLink>
          <NavLink to="/projects">Projetos</NavLink>
        </nav>
      </div>
    </header>
  )
}