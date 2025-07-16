import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import SideBarHeader from "./SideBarHeader";
import { nomalResFindAll } from "../../api/map/MapList";
import { addFavorite, removeFavorite, FavoriteCheck } from "../../api/user/userAction";
import { getCookie } from "../../util/cookie";
import { searchRestaurants } from "../../api/map/KeywoardSearch";


export default function TabSearch({ selectedTab,bounds, moveMapToFitBounds, searchKeyword, handleSearch ,setSelectedRestaurant}) {
    const navigate = useNavigate();
    const [restaurantList, setRestaurantList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);
    const [favorite, setFavorite] = useState(true);
    const [showOldList, setShowOldList] = useState([]);

    const userIdx = getCookie("userIdx");
    const isLoggedIn = !!userIdx;

    // ✅ 전체 음식점 초기 로드
    
    useEffect(() => {
        nomalResFindAll({'num': 0})
        .then((response) => {
            console.log(response.data);
            setRestaurantList(response.data);
        })
        .catch((error) => {
            console.error("음식점 목록을 불러오는 중 오류 발생:", error);
        });
}, []);
   /*
    useEffect(() => {
        const fetchAllRestaurants = async () => {
            const allData = [];

            for (let i = 0; i < 1; i++) {
            try {
                const response = await nomalResFindAll({ num: i });
                allData.push(...response.data);
                console.log(response.data);
            } catch (error) {
                console.error(요청 ${i} 실패:, error);
            }
            }
            console.log('allData: ', allData);
            setRestaurantList(allData);
        };

        fetchAllRestaurants();
    }, []);
    */

    // ✅ bounds 내의 음식점만 필터링해서 보여주기
    useEffect(() => {
    if (!bounds || searchKeyword.trim() !== "") return; // 검색어가 있을 때는 필터링 X

    const filtered = restaurantList.filter((item) => {
        const x = parseFloat(item.xpos);
        const y = parseFloat(item.ypos);
        return (
        x >= bounds.blX && x <= bounds.urX &&
        y >= bounds.blY && y <= bounds.urY
        );
    });

    setFilteredList(filtered);
    setFavoriteList(new Array(filtered.length).fill(false));
    setShowOldList(new Array(filtered.length).fill(false));
    }, [bounds, restaurantList, searchKeyword]);


    // ✅ 검색어로 DB에서 검색
   useEffect(() => {
    console.log("🧪 TabSearch received handleSearch:", typeof handleSearch);
    const fetchSearchResult = async () => {
    if (searchKeyword?.trim() === "") {
    if (bounds) {
        const filtered = restaurantList.filter((item) => {
                const x = parseFloat(item.xpos);
                const y = parseFloat(item.ypos);
                return (
                    x >= bounds.blX && x <= bounds.urX &&
                    y >= bounds.blY && y <= bounds.urY
                );
            });
        setFilteredList(filtered);
        setFavoriteList(new Array(filtered.length).fill(false));
        setShowOldList(new Array(filtered.length).fill(false));
    }else {
        setFilteredList([]); // bounds도 없으면 빈 값
        setFavoriteList([]);
        setShowOldList([]);
    }   
    return;
}
    try {
        const res = await searchRestaurants(searchKeyword);
        setFilteredList(res.data);
        setFavoriteList(new Array(res.data.length).fill(false));
        setShowOldList(new Array(res.data.length).fill(false));

        // ✅ 지도 이동 요청
        if (res.data.length > 0 && moveMapToFitBounds) {
            moveMapToFitBounds(res.data);
        }
        } catch (error) {
        console.error("검색 실패:", error);
        }
    };
        fetchSearchResult();
    }, [searchKeyword,restaurantList, bounds]);

    // ✅ 즐겨찾기 확인
    useEffect(() => {
        const fetchFavorites = async () => {
            if (!isLoggedIn || filteredList.length === 0) return;

            try {
                const res = await FavoriteCheck(userIdx);
                const favoriteResidxList = res.data.map(fav => fav.resIdx);
                const initList = filteredList.map(item =>
                    favoriteResidxList.includes(item.residx)
                );
                setFavoriteList(initList);
            } catch (error) {
                console.error("즐겨찾기 목록 확인 실패", error);
            }
        };

        fetchFavorites();
    }, [isLoggedIn, filteredList, userIdx]);

    const showOldAddr = (index) => {
        const updated = [...showOldList];
        updated[index] = !updated[index];
        setShowOldList(updated);
    };

    const handlerFavoriteClick = async (idx, resIdx) => {
        if (!isLoggedIn) {
            alert("로그인 후 이용 가능합니다.");
            return;
        }

        const updated = [...favoriteList];
        const isNowFavorite = !updated[idx];
        updated[idx] = isNowFavorite;
        setFavoriteList(updated);

        try {
            if (isNowFavorite) {
                await addFavorite(userIdx, resIdx);
            } else {
                await removeFavorite(userIdx, resIdx);
            }
        } catch (error) {
            console.error("즐겨찾기 처리 중 오류:", error);
            updated[idx] = !isNowFavorite; // 롤백
            setFavoriteList(updated);
        }
    };

    const handleDetailPage = (item) => {
    //navigate(/detail/${item.residx}, { state: item }); ← 이건 일단 보류하거나 별도로
    setSelectedRestaurant(item); // ✅ 상위로 전달
};

    return (
        <div className="sidebar">
            <SideBarHeader onSearch={handleSearch} />
            <h4>검색 결과</h4>

            {filteredList.map((item, index) => (
                <div key={item.residx} className="section" onClick={() => handleDetailPage(item)}>
                    <div className="container title">
                        <span className="sectionTitle">{item.resname}</span>
                        <span className="resType">{item.typeidx}</span>
                        {isLoggedIn && (
                            <button
                                type="button"
                                aria-pressed={!favorite}
                                className={`btn favorite ${favoriteList[index] ? "on" : ""}`}
                                onClick={(e) => {
                                    handlerFavoriteClick(index, item.residx);
                                    e.stopPropagation();
                                }}
                            />
                        )}
                    </div>
                    <span onClick={(e) => { showOldAddr(index); e.stopPropagation(); }}>
                        {item.newaddr}
                    </span>
                    {showOldList[index] && (
                        <span className="oldAddr" style={{ marginLeft: "10px" }}>
                            {item.oldaddr}<br />
                            <span>{item.resnum}</span>
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}