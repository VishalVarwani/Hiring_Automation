import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-light navbar-expand-md navigation-clean-search">
  <div className="container-fluid"><a className="navbar-brand" href="#">Hush Hush</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
    <div className="collapse navbar-collapse" id="navcol-1">
      <ul className="nav navbar-nav">
        <Link to="/home">
        <li className="nav-item" role="presentation"><a className="nav-link" href="/home">Search for candidates</a></li>
        </Link>
        <li className="nav-item dropdown"><a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#">Overview</a>
          <div className="dropdown-menu" role="menu"><a className="dropdown-item" role="presentation" href="#">Test</a><a className="dropdown-item" role="presentation" href="#">Results</a></div>
        </li>
      </ul>
      <form className="form-inline mr-auto" target="_self">
      </form>
      <Link to='/login'>
      <span className="navbar-text"> <a className="login" href="#">Log In</a>
      
      </span>
      </Link>
      <Link to='/signup'>
      <a className="btn btn-light action-button" role="button" href="#">Signup</a>

      </Link>
      </div>
  </div>
</nav>

    </div>
  )
}
