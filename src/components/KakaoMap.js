import React, { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
const { kakao } = window;

function KakaoMap({ mapx, mapy, mapLevel }) {
  const [map, setMap] = useState(null);
  const [mapLoading, mapError] = useKakaoLoader({
    appkey: '0b1bbc3a861f4930bd4ce7fcb1618e0e',
  });

  useEffect(() => {
    if (mapLoading || mapError || !mapx || !mapy || !mapLevel) return;

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(mapy, mapx),
      level: mapLevel - 1,
    };
    const map = new kakao.maps.Map(container, options);

    // 지도 마커 생성
    const markerPosition = new kakao.maps.LatLng(mapy, mapx);
    const mapMarker = new kakao.maps.Marker({
      position: markerPosition,
    });
    mapMarker.setMap(map);

    // 지도 컨트롤러 생성
    const mapController = new kakao.maps.MapTypeControl(); // 지도 / 스카이뷰 설정 컨트롤러
    const zoomController = new kakao.maps.ZoomControl(); // 줌 컨트롤러
    map.addControl(mapController, kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomController, kakao.maps.ControlPosition.RIGHT);

    setMap(map);
  }, [mapLoading, mapError, mapx, mapy]);
  if (mapLoading) {
    return <div>로딩중</div>;
  }

  if (mapError) {
    return <div>에러 발생 : {mapError.message}</div>;
  }

  return (
    <div>
      <div id="map" style={{ width: '500px', height: '400px' }}></div>
    </div>
  );
}

export default KakaoMap;
