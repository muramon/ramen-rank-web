import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap  } from "react-leaflet";
import Leaflet, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import '../App.css';
import { useLocation, useParams } from "react-router-dom"
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import CardItem from './CardItem';
import Image from '../images/ramen1.jpg'; // 画像のパスを適切に指定する

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function ChangeMapCenter({ position }: { position: LatLngExpression }) {
    const map = useMap()
    map.panTo(position)
  
    return null
  }


function Detail() {
    const { id: currentId } = useParams();
    const prevIdRef = useRef<string>();
    const DefaultIcon = Leaflet.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    });
    Leaflet.Marker.prototype.options.icon = DefaultIcon;
    const location = useLocation()
    const [contents, setContents] 
    = useState<{id: string,
                title: string, 
                content: string, 
                img: string}>(location.state as {id: string,
                                                title: string, 
                                                content: string, 
                                                img: string});
    const [detail, setDetail] = useState({"address": "0", "latitude": 36, "longitude": 139, "operationg_hours": "ss", "shop_holidays": "dd", "sns": "X"});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [center, setCenter] = useState<[number, number]>([detail.longitude, detail.latitude]);
    const navigate = useNavigate();
                                    
    useEffect(() => {
        if (prevIdRef.current !== currentId) {
          console.log('ID changed:', currentId);
          // Update the previous id
          prevIdRef.current = currentId;
        fetch(`http://localhost:8001/detail?id=${currentId}`, { method: "GET"})
                .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
                }
                ).then(data => {
                console.log(data)
                setLoading(false);
                // console.log(loading)
                setDetail(data);
                setCenter([data.longitude, data.latitude]);
                console.log(center)
                console.log(detail)
                },
                (error) => {
                setLoading(true);
                setError(error);
                console.log(error)
                }
            )
        }} ,[currentId]);

      const [shop, setShop] = useState([{"id": "0", "name": "a", "score": "3", "img": Image}]);

      useEffect(() => {
        fetch(`http://localhost:8001/title?id=${currentId}`, { method: "GET"})
              .then(res => {
                if (!res.ok) {
                  throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
              }
              ).then(data => {
                console.log(data)
                setShop(data);
                console.log(shop)
              }
              )
          } ,[currentId]);

  
    const [recommend, setRecommend] = useState([{"id": "0", "name": "a", "score": "3", "img": Image}]);
    const [loading_2, setLoading_2] = useState(true);
    const [error_2, setError_2] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:8001/recommend?title=${contents.title}`, { method: "GET"})
              .then(res => {
                if (!res.ok) {
                  throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
              }
              ).then(data => {
                console.log(data)
                setLoading_2(false);
                console.log(loading_2)
                setRecommend(data);
                console.log(recommend)
              },
              (error_2) => {
                setLoading_2(true);
                setError_2(error_2);
                console.log(error_2)
              }
            )
        } ,[currentId]);

    if (loading_2) {
        return <p>Loading...</p>;
    }

    if (error_2) {
        return <p>Error</p>;
    }

  return (
    <div className="map-container">
    <MapContainer
      center={[detail.latitude, detail.longitude]} // 初期のマップの中心座標
      zoom={15} // 初期のズームレベル
      style={{ width: '60%', height: '400px' }} // マップのサイズを設定
    >
    <ChangeMapCenter position={center} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMapのタイルURL
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
          <Popup>
            {shop[0].name}
          </Popup>
        </Marker>
    </MapContainer>
    {shop[0].name}
    {shop[0].score}
    {shop[0].img}
    <br></br>
    <p>{detail.address}</p>
    <p>{detail.latitude}</p>
    <p>Recommended</p>
    <Grid container spacing={3}>
      {recommend.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <CardActionArea onClick={() => navigate(`/detail/${item.id}`, { state: {id: item.id,
                                                                      title: item.name,
                                                                      content: item.score,
                                                                      img: item.img}})}>
          <CardItem title={item.name} content={item.score} img={item.img}/>
          </ CardActionArea>
        </Grid>
      ))}
    </Grid>
    </div>
  );
}

export default Detail;
