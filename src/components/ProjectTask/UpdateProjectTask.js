import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getProjectTask, addProjectTask} from '../../actions/projectTaskActions';

class UpdateProjectTask extends Component {
    constructor(){
        super();
        this.state = {
            id: "",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors){
            this.setState({errors: nextProps.errors});
        }

        const {
            id,
            summary,
            acceptanceCriteria,
            status,
            priority
        } = nextProps.project_task;

        this.setState({
            id,
            summary,
            acceptanceCriteria,
            status,
            priority
        });
    }

    componentDidMount() {
        const {pt_id} = this.props.match.params;
        this.props.getProjectTask(pt_id);
    }

    onSubmit(e){
        e.preventDefault();
        const updatedTask = {
            id: this.state.id,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority
        };

        this.props.addProjectTask(updatedTask, this.props.history);
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    render(){
        const {errors} = this.state;
        return (
            <div className="addProjectTask">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <Link to="/" className="btn btn-back">←</Link>
                            <h4 className="display-4 text-center">Update My Goal Or Task</h4>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames("form-control form-control-lg",{
                                            "is-invalid":errors.summary
                                        })} 
                                        name="summary" 
                                        placeholder="Write Here Your Goal Or Task Summary..." 
                                        value={this.state.summary}
                                        onChange={this.onChange}
                                    />
                                    {errors.summary && (
                                        <div className="invalid-feedback">{errors.summary}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        className="form-control form-control-lg" 
                                        placeholder="Write Here What You Need To Complete Task..." 
                                        name="acceptanceCriteria"
                                        value={this.state.acceptanceCriteria}
                                        onChange={this.onChange}>
                                    </textarea>
                                </div>
                                <div className="form-group">
                                    <select 
                                        className="form-control form-control-lg" 
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.onChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <select 
                                        className="form-control form-control-lg" 
                                        name="priority"
                                        value={this.state.priority}
                                        onChange={this.onChange}
                                    >
                                       <option value="">Select Priority</option>
                                       <option className="card-task-ur-im" value="URGENT_AND_IMPORTANT">URGENT AND IMPORTANT</option>
                                        <option className="card-task-ur-unim" value="URGENT_AND_UNIMPORTANT">URGENT AND UNIMPORTANT</option>
                                        <option className="card-task-notur-im" value="NOT_URGENT_AND_IMPORTANT">NOT URGENT AND IMPORTANT</option>
                                        <option className="card-task-notur-unim" value="NOT_URGENT_AND_UNIMPORTANT">NOT URGENT AND UNIMPORTANT</option>
                                    </select>
                                </div>
                                <input type="submit" className="btn btn-send" value="Update"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateProjectTask.propTypes = {
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getProjectTask: PropTypes.func.isRequired,
    addProjectTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    project_task: state.project_task.project_task,
    errors: state.errors
});

export default connect(mapStateToProps, {getProjectTask, addProjectTask}) (UpdateProjectTask);