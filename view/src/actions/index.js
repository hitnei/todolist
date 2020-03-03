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

export const decreaseCategoryAmountById = (id) => {
    return {
        type: Types.DECREASE_CATEGORY_AMOUNT_BY_ID,
        id
    }
}

export const changeListMemo = (data) => {
    return {
        type: Types.CHANGE_LISTMEMO,
        data
    }
}

export const changeListMemoById = (memo) => {
    return {
        type: Types.CHANGE_LISTMEMO_BY_ID,
        memo
    }
}

export const changeMemoSelected = (memo) => {
    return {
        type: Types.CHANGE_MEMOSELECTED,
        memo
    }
}

export const changeCategorySelect = (data) => {
    return {
        type: Types.CHANGE_CATEGORY_SELECT,
        data
    }
}

export const changeMemoIsClip = (id) => {
    return {
        type: Types.CHANGE_MEMO_ISCLIP,
        id
    }
}

export const changeIsDisableEditContent = () => {
    return {
        type: Types.CHANGE_IS_DISABLE_EDIT_CONTENT,
        
    }
}

export const disableEditContent = () => {
    return {
        type: Types.DISABLE_EDIT_CONTENT,
        
    }
}