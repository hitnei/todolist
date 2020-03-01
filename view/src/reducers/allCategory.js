import * as types from './../constants/ActionTypes';

var InitialState = []
const allCategory = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_ALLCATEGORY:
            state = action.data;
            return [...state];
        default:
            return state;
    }
};
export default allCategory;