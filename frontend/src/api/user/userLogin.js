import api from '../apiSetting';

export const userLogin = (formData) => {
    return api.post('/user/login', formData );
};