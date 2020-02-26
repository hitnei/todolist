import { combineReducers } from 'redux';
import allCategory from './allCategory'
import listMemo from './listMemo'
import memoSelected from './memoSelected'
import isLogin from './isLogin'

const Reducers = combineReducers({
    allCategory,
    listMemo,
    memoSelected,
    isLogin,
});

export default Reducers;