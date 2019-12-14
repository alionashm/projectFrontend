// import React, {Component} from 'react'

// class Navbar extends Component{
//     render(){
//         return (
//             <nav className="navbar">
//                 <div className="container">
//                     <a className="navbar-brand" href="/">
//                         Project Task Tool
//                     </a>
//                 </div>
//             </nav>
//         );
//     }
// }

// export default Navbar;

import React from 'react'

import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'


import { logout } from '../actions/auth'

class Navbar extends React.Component {

  onLogout = (e) => {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth
    let links
    if (localStorage.getItem("access_token")) {
      links = (
        <li className="nav-item dropdown">
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/login"
              onClick={this.onLogout}
            >Log Out</Link>
          </div>
        </li>
      )
    } else {
      links = (
        <React.Fragment>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              <i className="fa fa-sign-in"></i>
              Log In
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              <i className="fa fa-user-plus"></i>
              Register
            </Link>
          </li>
        </React.Fragment>
      )
    }
    return (
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Kakaya-to softina</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="fa fa-globe"></i>
                  All Posts
                </Link>
              </li>
              {/* {isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/feed">
                    <i className="fa fa-rss"></i>
                    Feed
                  </Link>
                </li>
              )} */}
            </ul>
            <ul className="navbar-nav">
              {links}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { logout })(Navbar)