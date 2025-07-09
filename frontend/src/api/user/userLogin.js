import api from '../apiSetting';

export const UserLogin = (formData) => {
    return api.post('/user/login', formData,{
        withCredentials: true
    } );
};