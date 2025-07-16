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
export const FavoriteCheck = (userIdx) => {
  return api.get(`/user/favorite/show/${userIdx}`, {
    params: { userIdx }
  });
};

// 리뷰 작성
export const writeReview = (data) => {
  console.log(data);
  return api.post("/review/write", data); // POST 요청
};

//가게 리뷰 조회
export const selReviewRes = (resIdx, data={}) => {
  return api.get(`/review/store/${resIdx}`,data);
}

export const selReviewUser = (userIdx, data={}) => {
  return api.get(`/review/my/${userIdx}`,data);
} 



