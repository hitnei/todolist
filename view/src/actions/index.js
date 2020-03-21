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

export const changeOrAddCategory = (category) => {
    return {
        type: Types.CHANGE_OR_ADD_CATEGORY,
        category
    }
}

export const changeListMemo = (data) => {
    return {
        type: Types.CHANGE_LISTMEMO,
        data
    }
}

export const changeListMemoById = (memo) => {
    memo = memo ? memo : null
    return {
        type: Types.CHANGE_LISTMEMO_BY_ID,
        memo
    }
}

export const addMemoListMemo = (memo) => {
    return {
        type: Types.LISTMEMO_ADD_MEMO,
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

export const changeIsDisableEditContent = (value) => {
    return {
        type: Types.CHANGE_IS_DISABLE_EDIT_CONTENT,
        value
    }
}

export const disableEditContent = () => {
    return {
        type: Types.DISABLE_EDIT_CONTENT,

    }
}

export const changeLoading = () => {
    return {
        type: Types.CHANGE_LOADING,

    }
}

export const changeIsShowCategory = (value) => {
    return {
        type: Types.CHANGE_IS_SHOW_CATEGORY,
        value
    }
}