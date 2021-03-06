

import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import ProjectTaskItem from './ProjectTask/ProjectTaskItem';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getBacklog,searchTasks} from '../actions/projectTaskActions';
import {Redirect} from 'react-router-dom';
class ProjectBoard extends Component{
    componentDidMount(){
        this.props.getBacklog();
    }

    findTask(){
        this.props.searchTasks(this.searchInput.value);
    }

    render() {
        const {project_tasks} = this.props;

        let BoardContent;
        let todoItems = [];
        let inProgressItems = [];
        let doneItems = [];

        // let links
        // if (localStorage.getItem("access_token")) {
        //     links = (
        //         <div className="container">
        //         <div className="search-block">
        //             <input className="input-search" type="text" placeholder="Search" ref={(input) => {this.searchInput = input}} onChange={this.findTask.bind(this)} />
        //             {/* <button className="btn-search" onChange={this.findTask.bind(this)}></button> */}
        //         </div>
        //         <Link to="/addProjectTask" className="btn btn-create">
        //             +
        //         </Link>
        //         <br />
        //         <br />
        //         {BoardContent}
        //     </div>
        //     )
        // } else{
        //     links = (<Redirect to="/login" />)
        // }
        
        const BoardAlgorithm = project_tasks => {
            if(project_tasks.length < 1){
                return (
                    <div className = "alert" role="alert">
                        No Tasks or Goals. Let's create!
                    </div>
                )
            } else {
                const tasks = project_tasks.map(project_task =>(
                    <ProjectTaskItem key={project_task.id} project_task={project_task}></ProjectTaskItem>
                ));

                for(let i = 0; i<tasks.length; i++){
                    if(tasks[i].props.project_task.status === "TO_DO"){
                        todoItems.push(tasks[i]);
                    }

                    if(tasks[i].props.project_task.status === "IN_PROGRESS"){
                        inProgressItems.push(tasks[i]);
                    }

                    if(tasks[i].props.project_task.status === "DONE"){
                    doneItems.push(tasks[i]);
                    }
                
                }
                return (
                    <React.Fragment>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-todo">
                                    <div className="card">
                                        <div className="card-header bg-secondary">
                                            <h3>Wath Do I Need To Do?</h3>
                                        </div>
                                    </div>

                                    {todoItems}
                                </div>
                                <div className="col-md-4 col-inprogress">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-primary">
                                            <h3>What's In Progress?</h3>
                                        </div>
                                    </div>
                                    
                                    {inProgressItems}
                                </div>
                                <div className="col-md-4 col-done">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-success">
                                            <h3>What I've Done?</h3>
                                        </div>
                                    </div>
                                
                                {doneItems}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            }
        };

        BoardContent = BoardAlgorithm(project_tasks);
        if (localStorage.getItem("access_token")) {
        return (
            <div className="container">
                <div className="search-block">
                    <input className="input-search" type="text" placeholder="Search" ref={(input) => {this.searchInput = input}} onChange={this.findTask.bind(this)} />
                    {/* <button className="btn-search" onChange={this.findTask.bind(this)}></button> */}
                </div>
                <Link to="/addProjectTask" className="btn btn-create">
                    +
                </Link>
                <br />
                <br />
                {BoardContent}
            </div>
        )}else{
            return(<Redirect to="/login" />)
        }
    }
}

ProjectBoard.propTypes = {
    getBacklog: PropTypes.func.isRequired,
    project_tasks: PropTypes.object.isRequired,
    searchTasks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    project_tasks: state.project_task.project_tasks.filter(project_task => project_task.summary.includes(state.filterTasks))
});

export default connect(mapStateToProps,{getBacklog, searchTasks}) (ProjectBoard);