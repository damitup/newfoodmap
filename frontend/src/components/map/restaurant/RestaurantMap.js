import React, { useEffect, useRef, useState } from "react";
import useRestaurants from "../../../hooks/map/RestaurantsHook";
import { createMapWithCurrentPosition } from "../../../utils/mapUtils/CreateCurrentPositionMap";
import { createMarkerWithOverlay } from "../../../utils/mapUtils/CreateMarker";
import { getOverlayContent } from "./RestaurantOverlay";
import "../../styles/Map.css";

const RestaurantMap = () => {
  const mapRef = useRef(null);
  const [currentOverlay, setCurrentOverlay] = useState(null);
  const { data: positions } = useRestaurants("/map/restaurants");

  useEffect(() => {
    if (!window.kakao) return;

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

  return <div ref={mapRef} style={{ width: "100%", height: "800px" }} />;
};

export default RestaurantMap;
