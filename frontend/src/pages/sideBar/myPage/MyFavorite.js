import { useState, useEffect } from "react";
import { getCookie } from "../../../util/cookie";
import { addFavorite, removeFavorite } from "../../../api/user/userAction";


export default function MyFavorite({ data,setData }) {
  const [favoriteList, setFavoriteList] = useState([]);
  const [showOldList, setShowOldList] = useState([]);
  const userIdx = getCookie("userIdx");
  const isLoggedIn = !!userIdx;

  useEffect(() => {
    if (Array.isArray(data)) {
      setFavoriteList(new Array(data.length).fill(false));
      setShowOldList(new Array(data.length).fill(false));
    }
  }, [data]);

  const handlerFavoriteClick = async (index, resIdx) => {
  const newFavoriteList = data.filter((_, i) => i !== index); // UI에서 바로 제거
  const newFavStatus = favoriteList.filter((_, i) => i !== index);
  const removedItem = data[index];

  setFavoriteList(newFavStatus);
  setData(newFavoriteList); // 리스트에서 즉시 제거

  try {
    await removeFavorite(userIdx, resIdx); // 서버에서 제거
  } catch (error) {
    console.error("❌ 즐겨찾기 해제 중 오류 발생:", error);

    // 실패 시 다시 추가 (복구)
    setFavoriteList((prev) => {
      const rollback = [...prev];
      rollback.splice(index, 0, true);
      return rollback;
    });

    setData((prev) => {
      const rollback = [...prev];
      rollback.splice(index, 0, removedItem);
      return rollback;
    });
  }
};


  const showOldAddr = (index) => {
    const updated = [...showOldList];
    updated[index] = !updated[index];
    setShowOldList(updated);
  };

  return (
    <div className="myFavorite">
      <h4>즐겨찾기 목록</h4>

      {Array.isArray(data) && data.length > 0 ? (
        data.map((item, index) => (
          <div key={item.residx} className="section">
            <div className="container title">
              <span className="sectionTitle">{item.resName}</span>
              {isLoggedIn && (
                <button
                  type="button"
                  aria-pressed={!favoriteList[index]}
                  className={`btn favorite ${favoriteList[index] ? "" : "on"}`}
                  onClick={(e) => {
                    handlerFavoriteClick(index, item.resIdx);
                    e.stopPropagation();
                  }}
                />
              )}
            </div>
            <span onClick={(e) => { showOldAddr(index); e.stopPropagation(); }}>
              {item.newAddr}
            </span>
            {showOldList[index] && (
              <span className="oldAddr" style={{ marginLeft: "10px" }}>
                {item.oldAddr}<br />
                <span>{item.resNum}</span>
              </span>
            )}
          </div>
        ))
      ) : (
        <p className="no-favorite">등록된 즐겨찾기가 없습니다.</p>
      )}
    </div>
  );
}