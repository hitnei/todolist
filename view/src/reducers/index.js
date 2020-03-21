import { combineReducers } from 'redux';
import allCategory from './allCategory'
import listMemo from './listMemo'
import memoSelected from './memoSelected'
import isLogin from './isLogin'
import categorySelect from './categorySelect'
import isDisableEditContent from './isDisableEditContent'
import loading from './loading'
import isShowCategory from './isShowCategory'
import isShowListMemo from './isShowListMemo'
import onCreate from './onCreate'

const Reducers = combineReducers({
    allCategory,
    listMemo,
    memoSelected,
    isLogin,
    categorySelect,
    isDisableEditContent,
    loading,
    isShowCategory,
    isShowListMemo,
    onCreate,
});

export default Reducers;