import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap  } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

interface DisplayMapProps {
    latitude: number;
    longitude: number;
    shopname: string;
  }

function ChangeMapCenter({ position }: { position: LatLngExpression }) {
const map = useMap()
map.panTo(position)

return null
}

const DisplayMap: React.FC<DisplayMapProps> = ({ latitude, longitude, shopname }) => {
    if (!longitude && !latitude) {
        return null;
    }
    return (
        <div className="map-container">
        <MapContainer
          center={[latitude, longitude]} // 初期のマップの中心座標
          zoom={15} // 初期のズームレベル
          style={{ width: '100%', height: '100%' }} // マップのサイズを設定
        >
        <ChangeMapCenter position={[longitude, latitude]} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMapのタイルURL
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[longitude, latitude]}>
              <Popup>
                {shopname}
              </Popup>
            </Marker>
        </MapContainer>
        </div>
    );
};

export default DisplayMap;
    