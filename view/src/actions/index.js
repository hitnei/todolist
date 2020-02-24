import * as Types from './../constants/ActionTypes';

export const changeIslogin = (data) => {
    return {
        type: Types.CHANGE_ISLOGIN,
        data
    }
}