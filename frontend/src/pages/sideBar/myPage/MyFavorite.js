import { useState, useEffect } from "react";

export default function MyFavorite({ data }) {
  const [favoriteList, setFavoriteList] = useState([]);
  const [favorite, setFavorite] = useState(true);

  // 즐겨찾기 리스트 초기화
  useEffect(() => {
    if (Array.isArray(data)) {
      setFavoriteList(new Array(data.length).fill(false));
    }
  }, [data]);

  // 즐겨찾기 클릭 설정
  const handlerFavoriteClick = (idx) => {
    setFavoriteList((prevList) => {
      const updated = [...prevList];
      updated[idx] = !updated[idx]; // 해당 인덱스만 토글
      return updated;
    });

    // TODO: 여기에 DB 저장 또는 삭제 API 요청 추가
  };

  return (
    <div className="myFavorite">
      <h4>즐겨찾기 목록</h4>

      {/* 🎯 조건부 렌더링 */}
      {!data || data.length === 0 ? (
        <p className="no-favorite">등록된 즐겨찾기가 없습니다.</p>
      ) : (
        data.map((item, index) => (
          <div key={index} className="section">
            <div className="container title">
              <span className="sectionTitle">{item.name}</span>
              <span className="resType">{item.type}</span>
              <button
                type="button"
                aria-pressed={!favorite}
                className={`btn favorite ${favoriteList[index] ? "on" : ""}`}
                onClick={() => handlerFavoriteClick(index)}
              />
            </div>
            <span>{item.content}</span>
            <span>{item.tel}</span>
          </div>
        ))
      )}
    </div>
  );
}
