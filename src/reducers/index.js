import { LOGIN_USER, LOGOUT_USER } from '../constants/actionTypes';

const initialState = {
        userId: null,
        username: null,
        token: null,
        role: null
};
  
function rootReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_USER:
            state = {...payload}
            return state;
        case LOGOUT_USER:
            state = {...payload}
            return state;
    }
}
  
export default rootReducer;