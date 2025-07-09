import { useLocation,useParams } from 'react-router-dom';
import HeaderPage from '../components/HeaderPage';
import { resData as bestData } from './sideBar/TabBestRes';
import { resData as cleanData } from './sideBar/TabCleanGrd';
import { resData as penelData } from './sideBar/TabPenel';
import { resData as searchData } from './sideBar/TabSearch';

export default function DetailPage() {
  const { idx } = useParams(); // URL의 :idx 추출
  const location = useLocation();

  const allData = [...bestData, ...cleanData, ...penelData, ...searchData];
  const data = location.state || allData.find(item => item.idx === idx);

  if (!data) {
    return <div className="detailPage">정보가 없습니다.</div>;
  }

  return (
    <div>
      <HeaderPage name={data.name} />
      <div className="detailPage">
        <div className="header">
          <div className="title">
            {["우수", "매우우수", "좋음"].includes(data.grade) && (
              <div className="gradeIcon best" />
            )}
            <span>{data.name}</span>
          </div>

          <p className="rating">후기 DB에서 count개</p>
          <div className="actions">
            <button onClick={() => window.open(`tel:${data.tel}`)}>전화</button>
            <button onClick={() => window.open(`https://map.kakao.com/?q=${data.name}`)}>길찾기</button>
            <button onClick={() => navigator.clipboard.writeText(window.location.href)}>공유</button>
          </div>
        </div>

        <div className="info">
          <h3>음식점 정보</h3>
          <ul>
            <li><strong>음식 종류:</strong> {data.type || "정보 없음"}</li>
            <li><strong className="icon map"></strong><strong>주소:</strong> {data.newAddr}</li>
            <li><strong className="icon call"></strong><strong>전화:</strong> {data.tel || "정보 없음"}</li>
            <li><strong className="icon grade"></strong><strong>등급:</strong> {data.grade || "미지정"}</li>
          </ul>
          <strong>음식점 설명</strong>
          <p className="description">{data.content || "설명 정보가 없습니다."}</p>
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
