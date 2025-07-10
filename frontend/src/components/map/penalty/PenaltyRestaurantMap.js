import React, { useEffect, useRef, useState } from "react";
import "../../../styles/map/penalty/PenaltyOverlayStyle.css";
import useRestaurants from "../../../hooks/map/RestaurantsHook";
import { createMapWithCurrentPosition } from "../../../utils/mapUtils/CreateCurrentPositionMap";
import { createMarkerWithOverlay } from "../../../utils/mapUtils/CreateMarker";
import { getBestOverlayContent } from "./PenaltyRestaurantOverlay";

const PenaltyRestaurantMap = () => {
  const mapRef = useRef(null);
  const [currentOverlay, setCurrentOverlay] = useState(null);
  const { data: positions } = useRestaurants("/map/peanltyRestaurants");

  useEffect(() => {
    if (!window.kakao) return;

    if (positions.length === 0) {
      console.log("아직 데이터 없음, 마커 생성하지 않음");
      return;
    }

    createMapWithCurrentPosition(mapRef.current, 3, (map) => {
      positions.forEach((pos) => {
        const overlay = createMarkerWithOverlay(map, pos, getBestOverlayContent(pos), (newOverlay) => {
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

export default PenaltyRestaurantMap;
