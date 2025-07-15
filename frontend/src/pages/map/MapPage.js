import { useState } from 'react';
import MainMap from '../components/map/MainMap';
import TabMenu from '../components/tab/TabMenu';
import TabSearch from '../components/sidebar/TabSearch';

export default function MapPage() {
  const [bounds, setBounds] = useState(null);
  const [selectedTab, setSelectedTab] = useState("search");

  return (
    <div className="mapContainer">
      <TabMenu setSelectedTab={setSelectedTab} />
      <MainMap selectedTab={selectedTab} setBounds={setBounds} />
      {selectedTab === "search" && <TabSearch bounds={bounds} />}
    </div>
  );
}
