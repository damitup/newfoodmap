import MapApi from "../MapApiClient";

export const nomalResFindAll = (params) => {
    return MapApi.get("/restaurants", {params});
};
export const bestResFindAll = (params) => {
    return MapApi.get("/bests", {params});
};
export const cleanGradeFindAll = (params) => {
    return MapApi.get("/clean", {params});
};
export const PenaltyFindAll = (params) => {
    return MapApi.get("/penalty", {params});
};
//상세페이지로 가기
export const nomalResGoDetail = (params) => {
  return MapApi.get(`/restaurants/${params}`);
};
export const bestResGoDetail = (params) => {
  return MapApi.get(`/bests/${params}`);
};
export const cleanResGoDetail = (params) => {
  return MapApi.get(`/clean/${params}`);
};
export const penaltyGoDetail = (params) => {
  return MapApi.get(`/penalty/${params}`);
};