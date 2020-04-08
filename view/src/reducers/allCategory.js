import * as types from './../constants/ActionTypes';

var sortList = (list) => {
    list = list.sort((item1, item2) => {
        var name1 = item1.categoryName.toLowerCase()
        var name2 = item2.categoryName.toLowerCase()
        return name1 < name2 ? -1 : name1 > name2? 1 : 0
    })
    return list
}

var InitialState = []
const allCategory = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_ALLCATEGORY:
            state = action.data;
            return sortList([...state]);
        case types.CHANGE_OR_ADD_CATEGORY:
            var { category } = action
            var { _id } = category
            var index = -1
            state.filter((val, ind) => {
                if (val._id === _id) index = ind
                return val
            })
            if (index === -1) {
                // add category
                state.push(category)
            } else {
                // increase categoryAmount
                state[index].categoryAmount = ++state[index].categoryAmount
            }
            return sortList([...state]);
        default:
            return sortList(state);
    }
};
export default allCategory;