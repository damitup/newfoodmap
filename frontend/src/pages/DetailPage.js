import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import HeaderPage from '../components/HeaderPage';
import {
    nomalResGoDetail,
    bestResGoDetail,
    cleanResGoDetail,
    penaltyGoDetail
  } from '../api/map/MapList';

export default function DetailPage() {
  const { idx } = useParams(); // residx
  const location = useLocation();
  const [data, setData] = useState(location.state || null);

  useEffect(() => {
  const changeDetailData = async () => {
    try {
      if (location.state) {
        setData(location.state);
        return;
      }

      const res1 = await nomalResGoDetail(idx);
      if (res1.data) return setData(res1.data);

      const res2 = await bestResGoDetail(idx);
      if (res2.data) return setData(res2.data);

      const res3 = await cleanResGoDetail(idx);
      if (res3.data) return setData(res3.data);

      const res4 = await penaltyGoDetail(idx);
      if (res4.data) return setData(res4.data);

      setData(null);
    } catch (e) {
      setData(null);
    }
  };

  changeDetailData();
}, [idx, location.state]); // 여기 의존성 중요!!

  if (!data) {
    return <div className="detailPage">정보가 없습니다.</div>;
  }

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

          <p className="rating">후기 DB에서 count개</p>
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

        <div className='line'></div>
        <div className="reviewSection">
          <h3>리뷰 (총 개)</h3>
          <div className="review">
            <p><strong>리뷰작성자이름</strong></p>
            <p>리뷰내용 예시1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
