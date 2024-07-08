import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, {
  MapPressEvent,
  Region,
  Marker,
  LatLng,
} from "react-native-maps";
import { RootStackParams } from "../types/stackParams";
import IconButton from "../components/UI/IconButton";
import { RouteProp, useRoute } from "@react-navigation/native";

type ScreenProps = NativeStackScreenProps<RootStackParams>;

const Map = ({ navigation }: ScreenProps) => {
  const route = useRoute<RouteProp<RootStackParams, "Map">>();

  const [selectedLocation, setSelectedLocation] = useState<LatLng>();

  // 지도에 나타날 기본 위치 설정
  // 위도, 경도, 확대수준 등
  const region: Region = {
    latitude: route.params.coordinate?.latitude || 37,
    longitude: route.params.coordinate?.longitude || 127,
    latitudeDelta: 0.09,
    longitudeDelta: 0.04,
  };

  const selectLocationHandler = (event: MapPressEvent) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ latitude, longitude });
  };

  const savePickedLocationHandler = () => {
    if (!selectedLocation)
      return Alert.alert(
        "선택 된 장소가 없습니다.",
        "지도에서 추가 할 장소를 선택해주세요."
      );

    navigation.navigate("AddPlace", { pickedLocation: selectedLocation });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          color={tintColor}
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, selectedLocation]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="선택 된 위치" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
