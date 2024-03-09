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
import { Container, Typography, CssBaseline } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Appbar from './Appbar';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

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
    const headers = new Headers({
      'Content-Type': 'application/json'
      // 'Authorization': `Bearer ${token}`
    })
                                    
    useEffect(() => {
        if (prevIdRef.current !== currentId) {
          console.log('ID changed:', currentId);
          // Update the previous id
          prevIdRef.current = currentId;
        fetch(`http://35.238.124.207/detail?id=${currentId}`, { method: "GET",headers: headers})
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
        fetch(`http://35.238.124.207/title?id=${currentId}`, { method: "GET",headers: headers})
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
          fetch(`http://35.238.124.207/recommend?title=${contents.title}`, { method: "GET",headers: headers})
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

      const [shopimage, setShopimage] = useState([{"img": Image, "context": 'str'}]);
      const [loading_3, setLoading_3] = useState(true);
      const [error_3, setError_3] = useState(null);
      useEffect(() => {
          fetch(`http://35.238.124.207/images?id=${currentId}`, { method: "GET",headers: headers})
                .then(res => {
                  if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                  }
                  return res.json();
                }
                ).then(data => {
                  console.log(data)
                  setLoading_3(false);
                  console.log(loading_3)
                  setShopimage(data);
                  console.log(shopimage)
                },
                (error_3) => {
                  setLoading_2(true);
                  setError_2(error_3);
                  console.log(error_3)
                }
              )
          } ,[currentId]);

      if (loading || loading_2 || loading_3) {
          return <p>Loading...</p>;
      }

      if (error || error_2 || error_3) {
          return <p>Error</p>;
      }
      
  return (
    <>
    <Appbar/>
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

    <Typography
      component="h1"
      variant="h4"
      align="center"
      color="text.primary"
      gutterBottom
      >
      {shop[0].name}
    </Typography>
    <Grid container spacing={3}>
      {shopimage.map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={4} direction="row" justifyContent="flex-start" alignItems="flex-start">
          <Card>
          <CardActionArea href={item.context}>
          <CardMedia
            sx={{ height: 180 }}
            image={item.img}
            title={item.context}
          />
          </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              店名
            </TableCell>
            <TableCell align="left">{shop[0].name}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row">
              住所
            </TableCell>
            <TableCell align="left">{detail.address}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row">
              営業時間
            </TableCell>
            <TableCell align="left">{detail.operationg_hours}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row">
              店休日
            </TableCell>
            <TableCell align="left">{detail.shop_holidays}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell component="th" scope="row">
              SNS
            </TableCell>
            <TableCell align="left"><Link href={detail.sns}>{detail.sns}</Link></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    <div className="map-container">
    <MapContainer
      center={[detail.latitude, detail.longitude]} // 初期のマップの中心座標
      zoom={15} // 初期のズームレベル
      style={{ width: '100%', height: '100%' }} // マップのサイズを設定
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
    </div>

    <br></br>
    

    <p>{shop[0].name}が気になった方におすすめのラーメン店10選！</p>
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
    </Container>
    </>
  );
}

export default Detail;
