import { combineReducers } from 'redux';
import allCategory from './allCategory'
import listMemo from './listMemo'
import memoSelected from './memoSelected'
import isLogin from './isLogin'
import listMemoSelected from './listMemoSelected'

const Reducers = combineReducers({
    allCategory,
    listMemo,
    memoSelected,
    isLogin,
    listMemoSelected,
});

export default Reducers;