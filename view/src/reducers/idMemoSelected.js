import * as types from '../constants/ActionTypes';

var InitialState = "1";

const idMemoSelected = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_IDMEMOSELECTED:
            state = action.id;
            return state;
        default:
            return state;
    }
};
export default idMemoSelected;