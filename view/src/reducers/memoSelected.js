import * as types from '../constants/ActionTypes';

var InitialState = {};

const memoSelected = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_MEMOSELECTED:
            state = action.memo? action.memo : state;
            return state;
        default:
            return state;
    }
};
export default memoSelected;