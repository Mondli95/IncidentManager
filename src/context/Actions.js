export const VerificationInProgress = (userLogins) => ({
    type: 'LOGIN_VERIFICATION'
});

export const LoginVerified = (userDetails) => ({
    type: 'USER_VERIFIED',
    payload: userDetails
});

export const LoginFailed = ({
    type: 'LOGIN_FAILED'
});

export const Logout = ({
    type: 'LOGOUT'
});