import api from "../apiSetting";

export const userLoginCheck = () => {
    return api.get("/user/status"); 
};

export const userLogout = () => {
    return api.post("/user/logout ",{
     path: window.location.pathname,
    });
};