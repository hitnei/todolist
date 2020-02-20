import { combineReducers } from 'redux';
import allCategory from './allCategory'
import listMemo from './listMemo'
import memoSelected from './memoSelected'
import idMemoSelected from './idMemoSelected'

const Reducers = combineReducers({
    allCategory,
    listMemo,
    memoSelected,
    idMemoSelected,
});

export default Reducers;