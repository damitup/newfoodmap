import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import HeaderPage from '../components/HeaderPage';
import { getCookie } from '../util/cookie';
import { writeReview } from '../api/user/userAction';

import {
  nomalResGoDetail,
  bestResGoDetail,
  cleanResGoDetail,
  penaltyGoDetail
} from '../api/map/MapList';

export default function DetailPage() {
  const { residx } = useParams();
  const location = useLocation();
  const userIdx = getCookie("userIdx"); // 로그인한 사용자
  const [data, setData] = useState(location.state || null);
  const [reviewContent, setReviewContent] = useState("");

  const handleReviewSubmit = async () => {
    if (!reviewContent.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    try {
      await writeReview({ userIdx, resIdx: residx, content: reviewContent });
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
      <HeaderPage name={data?.resname} />
      <div className="detailPage">
        {/* ... 생략 ... */}
        <div className="reviewSection">
          <h3>리뷰 (총 <strong>0개</strong>)</h3>

          {/* ✅ 로그인한 사용자만 리뷰 작성 가능 */}
          {userIdx && (
            <div className="review Wirte">
              <p><strong>{userIdx}</strong></p>
              <textarea
                id="reviewWrite"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="리뷰를 입력하세요"
              />
              <button onClick={handleReviewSubmit}>작성</button>
            </div>
          )}

          {/* 기존 리뷰 예시 */}
          <div className="review">
            <p><strong>리뷰작성자이름</strong></p>
            <p>리뷰내용 예시1</p>
          </div>
        </div>
      </div>
    </div>
  );
}