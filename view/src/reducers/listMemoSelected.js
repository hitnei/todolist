import * as types from '../constants/ActionTypes';

var InitialState = []

const listMemoSelected = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_LISTMEMOSELECTED:
            state = action.data;
            return state;
        default:
            return state;
    }
};
export default listMemoSelected;