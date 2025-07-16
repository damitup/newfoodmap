import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import HeaderPage from '../components/HeaderPage';
import { getCookie } from '../util/cookie';
import { writeReview } from '../api/user/userAction';
import { selReviewRes } from '../api/user/userAction';

export default function DetailPage() {
  const { residx} = useParams();
  const location = useLocation();
  const userIdx = getCookie("userIdx"); // 로그인한 사용자
  const [data, setData] = useState(location.state || null);
  const [reviewList,setReviewList] = useState([]);
  const [reviewContent, setReviewContent] = useState("");

  //리뷰 불러오기 
  const fetchReviews = async () => {
    try {
      const res = await selReviewRes(residx); // 
      console.log(res.data);
      setReviewList(res.data); 
    } catch (err) {
      console.error("리뷰 조회 실패:", err);
    }
  };

    useEffect(() => {
            
      fetchReviews(); // ⭐ 리뷰 목록 불러오기
    }, [residx, data]);


  //리뷰 작성
  const handleReviewSubmit = async () => {
    if (!reviewContent.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    try {
      await writeReview({ userIdx, resIdx: residx, reviewContent: reviewContent });
      alert("리뷰가 등록되었습니다.");
      setReviewContent("");
      // TODO: 등록 후 리뷰 목록 다시 불러오기
    } catch (err) {
      console.error("리뷰 등록 실패:", err);
      alert("리뷰 등록 중 문제가 발생했습니다.");
    }
  };

  return (
    <div>
      <HeaderPage name={data.resname} />
      <div className="detailPage">
        <div className="header">
          <div className="title">
            {["우수", "매우우수", "좋음"].includes(data.rescleanscore) && (
              <div className="gradeIcon best" />
            )}
            <span>{data.resname}</span>
          </div>

          <p className="rating">후기 {reviewList.length}개</p>
          <div className="actions">
            <button onClick={() => window.open(`tel:${data.resnum}`)}>전화</button>
            <button onClick={() => window.open(`https://map.kakao.com/?q=${data.resname}`)}>길찾기</button>
            <button onClick={() => navigator.clipboard.writeText(window.location.href)}>공유</button>
          </div>
        </div>

        <div className="info">
          <h3>음식점 정보</h3>
          <ul>
            <li><strong>음식 종류:</strong> {data.typeidx || "정보 없음"}</li>
            <li><strong className="icon map"></strong><strong>주소:</strong> {data.newaddr}</li>
            <li><strong className="icon call"></strong><strong>전화:</strong> {data.resnum || "정보 없음"}</li>
            <li><strong className="icon grade"></strong><strong>등급:</strong> {data.rescleanscore || "미지정"}</li>
          </ul>
          <strong>음식점 설명</strong>
          <p className="description">{data.resmaindish || "설명 정보가 없습니다."}</p>
        </div>
          {/* ✅ 로그인한 사용자만 리뷰 작성 가능 */}
          
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

          {/* 기존 리뷰 예시 */}
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