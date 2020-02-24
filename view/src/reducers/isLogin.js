import * as types from './../constants/ActionTypes';

var InitialState = false;

const isLogin = (state = InitialState, action) => {
    switch (action.type) {
        case types.CHANGE_ISLOGIN:
            state = action.data;
            return state;
        default:
            return state;
    }
};
export default isLogin;