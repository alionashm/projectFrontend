import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteProjectTask} from '../../actions/projectTaskActions';

class ProjectTaskItem extends Component {
    onDeleteClick(pt_id) {
        this.props.deleteProjectTask(pt_id);
    }

    render() {
        const {project_task} = this.props;
        var card_color = "";
        var card_priority = "";
        if(this.props.project_task.priority === "URGENT_AND_IMPORTANT"){
            card_color="swing card card-task card-task-ur-im";
            card_priority="Urgent And Important";
        }

        if(this.props.project_task.priority === "URGENT_AND_UNIMPORTANT"){
            card_color="swing card card-task card-task-ur-unim";
            card_priority="Urgent And Unimportant";
        }

        if(this.props.project_task.priority === "NOT_URGENT_AND_IMPORTANT"){
            card_color="swing card card-task card-task-notur-im";
            card_priority="Not Urgent And Important";
        }

        if(this.props.project_task.priority === "NOT_URGENT_AND_UNIMPORTANT"){
            card_color="swing card card-task card-task-notur-unim";
            card_priority="Not Urgent And Unimportant";
        }
        return (
            <div className={card_color} data-title={card_priority}>
                <div className="card-task-header">
                    <div className="card-header">
                        ID: {project_task.id}
                    </div>
                    <button className="btn-delete"
                    onClick={this.onDeleteClick.bind(this, project_task.id)}>
                        Х
                    </button>
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{project_task.summary}</h5>
                    <p className="card-text">
                        {project_task.acceptanceCriteria}
                    </p>
                    <Link to={`updateProjectTask/${project_task.id}`} className="btn btn-view-update">
                        View / Update
                    </Link>

                    
                </div>
            </div>
        )
    }
}

ProjectTaskItem.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired
};

export default connect(null,{deleteProjectTask})(ProjectTaskItem);