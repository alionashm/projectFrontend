
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
    let links
    if (localStorage.getItem("access_token")) {
      links = (
        
            <div className="btn">
            <Link
              to="/login"
              onClick={this.onLogout}
            >Log Out</Link>
          </div>
      )
    } else {
      links = (
        <React.Fragment>
          {/* <div className="btn">
            <Link to="/login">
              <i className="fa fa-sign-in"></i>
              Log In
            </Link>
          </div> */}
          <div className="btn btn-register">
            <Link className="btn-register" to="/register">
              Sign Up
            </Link>
          </div>
        </React.Fragment>
      )
    }
    return (
      <nav className="navbar">
        <div className="container">
            <a className="navbar-brand" href="/">
                Project Task Tool
            </a>
            {links}
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