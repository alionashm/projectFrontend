import {GET_PROJECT_TASKS, DELETE_PROJECT_TASK, GET_PROJECT_TASK} from '../actions/types';

const initialState = '';

export default function(state=initialState, action){

    if (action.type === 'FIND_TASKS'){
        return action.payload
    }
    return state;
}