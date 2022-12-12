import ApiService from './ApiService'
import TokenService from './TokenService'

const verifySession = () => {
    return ApiService.post('session/refresh')
    .then(res => {
        const {token} = res.data
        TokenService.updateLocalAccessToken(token)
        return res.data
    });
}

const login = (username, password) => {
    return ApiService.post('admin/login', {
        inst_id: username,
        password
    })
    .then(res => {
        const {token, admin} = res.data;
        TokenService.setLocalUser({
            _a: token,
            ...admin
        });
        return res.data;
    })
}

const logout = () => {
    return ApiService.post('admin/logout', 
        {})
        .then(res => {
            TokenService.removeLocalUser();
            return res.data;
        })
}

const getCurrentUser = () => {
    return TokenService.getLocalUser(); 
}

const AuthService = {
    login,
    logout,
    getCurrentUser,
    verifySession
}

export default AuthService