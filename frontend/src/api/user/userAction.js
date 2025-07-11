 import api from "../apiSetting";
  
  // 즐겨찾기 추가
export const addFavorite = (userIdx, resIdx) => {
  return api.post("/user/favorite", { userIdx, resIdx });
};

// 즐겨찾기 삭제
export const removeFavorite = (userIdx, resIdx) => {
  return api.delete("/user/favorite", { data: { userIdx, resIdx } });
};
//즐겨찾기 리스트 출력
export const FavoriteCheck = (userIdx, resIdx) => {
  return api.get(`/user/favorite/${userIdx}`, {
    params: { userIdx, resIdx }
  });
};

// 
export const writeReview = (data) => {
  return api.post("/review/write", data); // POST 요청
};


