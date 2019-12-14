import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProjectBoard from './components/ProjectBoard';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AddProjectTask from './components/ProjectTask/AddProjectTask';
import {Provider} from 'react-redux';
import store from './store'
import UpdateProjectTask from './components/ProjectTask/UpdateProjectTask';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

// if (localStotage.access_token) {
//   const {access_token} = localStorage
//   store.dispatch(setCurrentUser(access_token))
// }

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
            <Navbar />
            <Route exact path="/" component={ProjectBoard} />
            <Route exact path="/addProjectTask" component={AddProjectTask} />
            <Route exact path="/updateProjectTask/:pt_id" component={UpdateProjectTask} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
