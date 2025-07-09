import api from '../apiSetting';

export const userRegist = (formData) => {
    return api.post('/user/register',JSON.stringify(formData),);
}