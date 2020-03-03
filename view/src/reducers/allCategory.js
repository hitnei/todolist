import * as types from './../constants/ActionTypes';

var InitialState = []
const allCategory = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_ALLCATEGORY:
            state = action.data;
            return [...state];
        case types.DECREASE_CATEGORY_AMOUNT_BY_ID:
            var { id } = action
            state = state.map(category => {
                if (category._id === id) {
                    category.categoryAmount = category.categoryAmount > 0? --category.categoryAmount : category.categoryAmount
                    return category
                }
                return category
            })
            return [...state];
        default:
            return state;
    }
};
export default allCategory;