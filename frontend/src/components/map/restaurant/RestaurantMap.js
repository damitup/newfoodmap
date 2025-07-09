import React, { useEffect, useRef, useState } from "react";
import useRestaurants from "../../../hooks/map/RestaurantsHook";
import { createMapWithCurrentPosition } from "../../../utils/mapUtils/CreateCurrentPositionMap";
import { createMarkerWithOverlay } from "../../../utils/mapUtils/CreateMarker";
import { getOverlayContent } from "./RestaurantOverlay";

const RestaurantMap = () => {
  const mapRef = useRef(null);
  const [currentOverlay, setCurrentOverlay] = useState(null);
  const { data: positions } = useRestaurants("/map/restaurants");

  useEffect(() => {
    console.log("kakao?", window.kakao);

    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 SDK가 로드되지 않았습니다.");
      return;
    }

    createMapWithCurrentPosition(mapRef.current, 3, (map) => {
      positions.forEach((pos) => {
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
