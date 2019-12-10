import {combineReducers} from 'redux'
import errorsReducer from './errorsReducer';
import projectTaskReducer from './projectTaskReducer';
import filterTasksreducer from './filterTasksreducer';

export default combineReducers({

    errors: errorsReducer,
    project_task: projectTaskReducer,
    filterTasks: filterTasksreducer
});