import * as types from '../constants/ActionTypes';

var InitialState = []

const listMemoSelected = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_LISTMEMO_SELECTED:
            state = action.data;
            return state;
        default:
            return state;
    }
};
export default listMemoSelected;