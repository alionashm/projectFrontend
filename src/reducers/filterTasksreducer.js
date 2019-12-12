import {FIND_TASKS} from '../actions/types';

const initialState = '';

export default function(state=initialState, action){

    if (action.type === 'FIND_TASKS'){
        return action.payload
    }
    return state;
}