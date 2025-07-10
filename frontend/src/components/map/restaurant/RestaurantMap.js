import React, { useEffect, useRef, useState } from "react";
import "../../../styles/map/restaurant/RestaurantOverlayStyle.css";
import useRestaurants from "../../../hooks/map/RestaurantsHook";
import { createMapWithCurrentPosition } from "../../../utils/mapUtils/CreateCurrentPositionMap";
import { createMarkerWithOverlay } from "../../../utils/mapUtils/CreateMarker";
import { getOverlayContent } from "./RestaurantOverlay";

const RestaurantMap = () => {
  const mapRef = useRef(null);
  const [currentOverlay, setCurrentOverlay] = useState(null);
  const { data: positions } = useRestaurants("/map/restaurants");

  useEffect(() => {
    console.log("positions 데이터:", positions);

    console.log("kakao?", window.kakao);

    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 SDK가 로드되지 않았습니다.");
      return;
    }
    
    
    createMapWithCurrentPosition(mapRef.current, 3, (map) => {
      if (positions.length === 0) {
        console.log("아직 데이터 없음, 마커 생성하지 않음");
        return;
      }
      positions.forEach((pos) => {
        console.log("마커", pos.ypos, pos.xpos);
        const overlay = createMarkerWithOverlay(map, pos, getOverlayContent(pos), (newOverlay) => {
          if (currentOverlay) currentOverlay.setMap(null);
          setCurrentOverlay(newOverlay);
          if (newOverlay) newOverlay.setMap(map);
        });
      });

      window.kakao.maps.event.addListener(map, "click", () => {
        if (currentOverlay) {
          currentOverlay.setMap(null);
          setCurrentOverlay(null);
        }
      });
    });
  }, [positions]);

  return <div ref={mapRef} style={{ width: "100%", height: "900px" }} />;
};

export default RestaurantMap;
