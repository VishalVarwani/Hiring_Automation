import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div style={{backgroundColor:"#2A2824"}}>
      <nav className="navbar navbar-light navbar-expand-md navigation-clean-search">
  <div className="container-fluid"><a  style={{color:"white"}} className="navbar-brand" href="#">Hush Hush</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
    <div className="collapse navbar-collapse" id="navcol-1">
      <ul className="nav navbar-nav">
        <Link to="/home">
        <li className="nav-item" role="presentation"><Link  style={{color:"white"}} className="nav-link" to="/home">Search for candidates</Link></li>
        </Link>
        <Link to="/candidateresults">
        <li className="nav-item" role="presentation"><Link  style={{color:"white"}} className="nav-link" to="/candidateresults">Overview</Link></li>
        </Link>
      </ul>
      <form className="form-inline mr-auto" target="_self">
      </form>
      <Link to='/'>
      <span className="navbar-text"> <a  style={{color:"white", margin:15}} className="login" href="#">Log out</a>
      
      </span>
      </Link>
     
      </div>
  </div>
</nav>

    </div>
  )
}
