import * as Types from '../constants/ActionTypes';

export const changeAvatar = (urlAvatar) => {
    return {
        type: Types.CHANGE_AVATAR,
        urlAvatar
    }
}