import api from "../apiSetting";

/**
 * 검색어로 음식점 리스트를 검색합니다.
 * @param {string} keyword - 사용자 검색어
 * @returns {Promise} - 음식점 리스트 (resname, xpos, ypos 등 포함)
 */
export const searchRestaurants = (keyword) => {
  return api.get("/map/search", {
    params: { keyword: keyword }
  });
};