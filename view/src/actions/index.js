import * as Types from './../constants/ActionTypes';

export const changeIslogin = (data) => {
    return {
        type: Types.CHANGE_ISLOGIN,
        data
    }
}

export const changeAllCategory = (data) => {
    return {
        type: Types.CHANGE_ALLCATEGORY,
        data
    }
}

export const changeListMemo = (data) => {
    return {
        type: Types.CHANGE_LISTMEMO,
        data
    }
}

export const changeListMemoSelected = (data) => {
    return {
        type: Types.CHANGE_LISTMEMOSELECTED,
        data
    }
}

export const changeMemoSelected = (memo) => {
    return {
        type: Types.CHANGE_MEMOSELECTED,
        memo
    }
}