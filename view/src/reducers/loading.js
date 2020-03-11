import * as types from './../constants/ActionTypes';

var InitialState = false
const loading = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_LOADING:
            return !state;
        default:
            return state;
    }
};
export default loading;