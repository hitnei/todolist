import { combineReducers } from 'redux';
import allCategory from './allCategory'
import listMemo from './listMemo'
import memoSelected from './memoSelected'
import idMemoSelected from './idMemoSelected'
import isLogin from './isLogin'

const Reducers = combineReducers({
    allCategory,
    listMemo,
    memoSelected,
    idMemoSelected,
    isLogin,
});

export default Reducers;