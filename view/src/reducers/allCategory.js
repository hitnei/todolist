import * as types from './../constants/ActionTypes';

var InitialState = [
    {
        categoryID: "1",
        categoryName: "Category-1",
        categoryAmount: 1
    },
    {
        categoryID: "2",
        categoryName: "Category-2",
        categoryAmount: 2
    },
    {
        categoryID: "3",
        categoryName: "Category-3",
        categoryAmount: 3
    },
    {
        categoryID: "4",
        categoryName: "Category-4",
        categoryAmount: 4
    },
    {
        categoryID: "5",
        categoryName: "Category-5",
        categoryAmount: 5
    },
    {
        categoryID: "6",
        categoryName: "Category-6",
        categoryAmount: 6
    },
    {
        categoryID: "7",
        categoryName: "Category-7",
        categoryAmount: 7
    },
    {
        categoryID: "8",
        categoryName: "Category-8",
        categoryAmount: 8
    },
    {
        categoryID: "9",
        categoryName: "Category-9",
        categoryAmount: 9
    },
    {
        categoryID: "10",
        categoryName: "Category-10",
        categoryAmount: 10
    },
    {
        categoryID: "11",
        categoryName: "Category-11",
        categoryAmount: 11
    },
    {
        categoryID: "12",
        categoryName: "Category-12",
        categoryAmount: 12
    },
    {
        categoryID: "13",
        categoryName: "Category-13",
        categoryAmount: 13
    },
];

const allCategory = (state = InitialState, action) => {
    switch (action.type) {
        case types.GET_QUESTIONS:
            state = action.data;
            return state;
        default:
            return state;
    }
};
export default allCategory;