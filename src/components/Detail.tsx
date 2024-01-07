import React, { useState } from 'react';
import { MapContainer, TileLayer,Marker,Popup  } from "react-leaflet";
import Leaflet, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import '../App.css';
import { useLocation } from "react-router-dom"

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function Detail() {
//   const defaultCenter = [35.6895, 139.6917]; // 東京の座標
  const DefaultIcon = Leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  Leaflet.Marker.prototype.options.icon = DefaultIcon;

  const location = useLocation()
  const [contents] 
  = useState<{title: string, 
              content: string, 
              img: string}>(location.state as {title: string, 
                                               content: string, 
                                               img: string});
  
  return (
    <div className="map-container">
    <MapContainer
      center={[35.6895, 139.6917]} // 初期のマップの中心座標
      zoom={13} // 初期のズームレベル
      style={{ width: '60%', height: '400px' }} // マップのサイズを設定
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMapのタイルURL
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[35.6895, 139.6917]}>
          <Popup>
            東京タワー<br />
            ここは東京の中心です。
          </Popup>
        </Marker>
    </MapContainer>
    {contents.title}
    {contents.content}
    {contents.img}
    </div>
  );
}

export default Detail;
