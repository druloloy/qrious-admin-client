const getLocalAccessToken = () => {
    // Get the access token from local storage
    const user = JSON.parse(localStorage.getItem('_u'));
    return user?._a;
    // If the access token is not available
}

const updateLocalAccessToken = (token) => {
    // Get the access token from local storage
    let user = JSON.parse(localStorage.getItem('_u'));
    // Update the access token
    user['_a'] = token;
    // Store the updated access token
    localStorage.setItem('_u', JSON.stringify(user));
}

const getLocalUser = () => {
    return JSON.parse(localStorage.getItem('_u'));
}

const setLocalUser = (user) => {
    localStorage.setItem('_u', JSON.stringify(user));
}

const removeLocalUser = () => {
    localStorage.removeItem('_u');
}

const TokenService = {
    getLocalAccessToken,
    updateLocalAccessToken,
    getLocalUser,
    setLocalUser,
    removeLocalUser
}

export default TokenService;