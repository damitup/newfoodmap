import React from "react";
import RestaurantMap from "./map/restaurant/RestaurantMap";
import BestRestaurantMap from "./map/bestRestaurant/BestRestaurantMap";
export default function MapView ({selectedTab}){

    switch(selectedTab){
       case "best":
      return <BestRestaurantMap />;
    case "penal":
      return <PenaltyRestaurantMap />;
    case "clean":
      return <RestaurantMap type="clean" />;
    case "search":
      return <RestaurantMap type="search" />;
    default:
      return <RestaurantMap />; // 기본 지도
  }
}