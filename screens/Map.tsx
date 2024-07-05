import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Region } from "react-native-maps";

const Map = ({}: {}) => {
  // 지도에 나타날 기본 위치 설정
  // 위도, 경도, 확대수준 등
  const region: Region = {
    latitude: 37.48078611,
    longitude: 127.0348111,
    latitudeDelta: 0.09,
    longitudeDelta: 0.04,
  };

  return <MapView initialRegion={region} style={styles.map}></MapView>;
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});