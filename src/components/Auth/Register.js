import React from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {register} from '../../actions/auth'

class Register extends React.Component {

    constructor(){
        super()
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onSubmit = (e) => {
        e.preventDefault()
        this.props.register(this.state, this.props.history)
    }
    render(){
       return(
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                  <h4 className="display-4 text-center">Sign Up</h4>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group form-login">
                        <input
                          className="form-control"
                          placeholder="Name"
                          type="text"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange}
                          pattern=".{3,20}"
                          required
                        />
                    </div>
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
                        />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-send">Sign Up</button>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        )
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({auth: state.auth})

export default connect(mapStateToProps, {register})(Register)