import{ saveUserInfo, clearUserInfo } from './user';
import{loginUser,registerUser} from '@/utils/api';

export const login = (username, password) => (dispatch) => {
    return new Promise((resolve,reject) => {
        loginUser({name:username.trim(),pwd:password})
        .then(res => {
            console.log('login===',res)
            if(res.code === 0) {
                dispatch(saveUserInfo(JSON.parse(res.data)));
                resolve(res);
            } else {
                reject(res.msg);
            }
        })
    })
}

export const register = (username, password) => (dispatch) => {
    return new Promise((resolve,reject) => {
        registerUser({name:username.trim(),pwd:password})
        .then(res=>{
            console.log('signup===',res)
            if(res.code === 0) {
                dispatch(saveUserInfo(JSON.parse(res.data)));
                resolve(res);
            } else {
                reject(res.msg);
            }
        })
    })
}

export const logout = () => (dispatch) => {
    console.log('logout')
    dispatch(clearUserInfo());
    window.location.herf = '/login';
}