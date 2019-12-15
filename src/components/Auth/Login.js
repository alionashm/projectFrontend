import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {login} from '../../actions/auth'

class Login extends React.Component {

    constructor(){
        super()
        this.state ={
            email: '',
            password:''
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.auth.isAuthenticated){
            this.props.history.push('/')
        }
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onSubmit = (e) =>{
        e.preventDefault()
        this.props.login(this.state)
    }

    render(){
        return(
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
                <h4 className="display-4 text-center">Sign In</h4>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group form-login">
                      
                      <input
                        className="form-control"
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        pattern=".{5,30}"
                        required
                      />
                  </div>
                  <div className="form-group form-login">
                      <input
                        className="form-control"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        pattern=".{6,30}"
                        required
                      />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-send">Sign In</button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }
    
  const mapStateToProps = (state) => ({ auth: state.auth })
    
  export default connect(mapStateToProps, { login })(Login)