const Reducer = (state, action) => {
    switch (action.type) {

        case 'LOGIN_VERIFICATION':
            return {
                userDetails: null,
                isFetching: true,
                error: false
            };
        case 'USER_VERIFIED':
            return {
                userDetails: action.payload,
                isFetching: false,
                error: false
            };
        case 'LOGIN_FAILED':
            return {
                userDetails: null,
                isFetching: false,
                error: true
            };
        case 'LOGOUT':
            return {
                userDetails: null,
                isFetching: false,
                error: false
            };
        default:
            return state;
    }
}

export default Reducer;