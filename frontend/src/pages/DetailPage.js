import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderPage from '../components/HeaderPage';
import { getCookie } from '../util/cookie';
import { writeReview, selReviewRes } from '../api/user/userAction';
import { nomalResGoDetail,bestResGoDetail,cleanResGoDetail,penaltyGoDetail } from '../api/map/MapList';


export default function DetailPage({handleSearch,selectedRestaurant}) {
  const { residx } = useParams();
  const userIdx = getCookie("userIdx");
  const [restaurant, setRestaurant] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [reviewContent, setReviewContent] = useState("");

  // 상세정보 + 리뷰 불러오기
  useEffect(() => {
    if (!residx) return;
    if(nomalResGoDetail){
    nomalResGoDetail(residx)
      .then((res) => {
        setRestaurant(res.data);
      })
      .catch((err) => {
        console.error("상세 정보 불러오기 실패:", err);
      });
    }
     if(bestResGoDetail){
    bestResGoDetail(residx)
      .then((res) => {
        setRestaurant(res.data);
      })
      .catch((err) => {
        console.error("상세 정보 불러오기 실패:", err);
      });
    }
    if(cleanResGoDetail){
    cleanResGoDetail(residx)
      .then((res) => {
        setRestaurant(res.data);
      })
      .catch((err) => {
        console.error("상세 정보 불러오기 실패:", err);
      });
    }
    if(penaltyGoDetail){
    penaltyGoDetail(residx)
      .then((res) => {
        setRestaurant(res.data);
      })
      .catch((err) => {
        console.error("상세 정보 불러오기 실패:", err);
      });
    } 

    selReviewRes(residx)
      .then((res) => {
        setReviewList(res.data);
      })
      .catch((err) => {
        console.error("리뷰 조회 실패:", err);
      });
  }, [residx]);

  const handleReviewSubmit = async () => {
    if (!reviewContent.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    try {
      await writeReview({ userIdx, resIdx: residx, reviewContent });
      alert("리뷰가 등록되었습니다.");
      setReviewContent("");
      // 등록 후 리뷰 다시 조회
      const res = await selReviewRes(residx);
      setReviewList(res.data);
    } catch (err) {
      console.error("리뷰 등록 실패:", err);
      alert("리뷰 등록 중 문제가 발생했습니다.");
    }
  };

  if (!restaurant) return <div>로딩 중...</div>;

  return (
    <div>
      <HeaderPage name={restaurant.resname} onSearch={handleSearch} />
      <div className="detailPage">
        <div className="header">
          <div className="title">
            {["우수", "매우우수", "좋음"].includes(restaurant.rescleanscore) && (
              <div className="gradeIcon best" />
            )}
            <span>{restaurant.resname}</span>
          </div>

          <p className="rating">후기 {reviewList.length}개</p>
          <div className="actions">
            <button onClick={() => window.open(`tel:${restaurant.resnum}`)}>전화</button>
            <button onClick={() => window.open(`https://map.kakao.com/?q=${restaurant.resname}`)}>길찾기</button>
            <button onClick={() => navigator.clipboard.writeText(window.location.href)}>공유</button>
          </div>
        </div>

        <div className="info">
          <h3>음식점 정보</h3>
          <ul>
            <li><strong>음식 종류:</strong> {restaurant.typeidx || "정보 없음"}</li>
            <li><strong className="icon map"></strong><strong>주소:</strong> {restaurant.newaddr}</li>
            <li><strong className="icon call"></strong><strong>전화:</strong> {restaurant.resnum || "정보 없음"}</li>
            <li><strong className="icon grade"></strong><strong>등급:</strong> {restaurant.rescleanscore || "미지정"}</li>
          </ul>
          <strong>음식점 설명</strong>
          <p className="description">{restaurant.resmaindish || "설명 정보가 없습니다."}</p>
        </div>

        <div className="review">
          {userIdx && (
            <div className="review write">
              <p><strong>리뷰 작성란</strong></p>
              <textarea
                id="reviewWrite"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="리뷰를 입력하세요"
              />
              <div className='reivewWriteBtn'>
                <button onClick={handleReviewSubmit}>작성</button>
              </div>
            </div>
          )}

          {reviewList.length === 0 ? (
            <span>리뷰가 없습니다.</span>
          ) : (
            reviewList.map((review, idx) => (
              <div className="reviewContainer" key={idx}>
                <p><strong>이름 : {review.userName}</strong></p>
                <p>{review.reviewContent} <span className='reviewDate'>{review.reviewDate}</span></p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
