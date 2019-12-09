import React, {Component} from 'react'

class Navbar extends Component{
    render(){
        return (
            <nav className="navbar">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        Project Task Tool
                    </a>
                </div>
            </nav>
        );
    }
}

export default Navbar;