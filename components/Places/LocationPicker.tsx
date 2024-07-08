import React, { useLayoutEffect } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Colors } from "../../constants/colors";
import { getAddress, getStaticMapPreview } from "../../utils/location";

import { RootStackParams } from "../../types/stackParams";
import { Location } from "../../types/place";

interface Props {
  location: Location | undefined;
  setLocation: (location: Location) => void;
}

const LocationPicker = ({ location, setLocation }: Props) => {
  const route = useRoute<RouteProp<RootStackParams, "AddPlace">>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  // 권한 요청
  const verifyPermissions = async () => {
    if (locationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      // 아직 권한 요청을 받은 적이 없음
      const permissionRes = await requestPermission();
      return permissionRes.granted; // boolean
    }

    if (locationPermissionInfo?.status === PermissionStatus.DENIED) {
      // 권한이 허용되지 않은 경우
      Alert.alert(
        "접근 권한이 없습니다.",
        "이 앱을 사용하려면 위치 접근 권한이 필요합니다."
      );
      return false;
    }

    return true;
  };

  const getCurrentUserPosition = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    return await getCurrentPositionAsync({});
  };

  const getLocationHandler = async () => {
    const location = await getCurrentUserPosition();

    if (!location) return;

    const coordinate = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const address = await getAddress(coordinate);
    setLocation({ ...coordinate, address });
  };

  const pickOnMapHandler = async () => {
    const location = await getCurrentUserPosition();

    if (!location) return;

    navigation.navigate("Map", {
      coordinate: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  useLayoutEffect(() => {
    async function handlerLocation() {
      if (route.params?.pickedLocation) {
        const coordinate = route.params.pickedLocation;

        const address = await getAddress(coordinate);
        setLocation({ ...coordinate, address });
      }
    }
  }, [route]);

  return (
    <View>
      <Text style={styles.subtitle}>위치선택</Text>
      <View style={styles.mapPreview}>
        {location ? (
          <Image
            style={styles.image}
            source={{
              uri: getStaticMapPreview(location),
            }}
          />
        ) : (
          <Text style={styles.subtitle}>No Picked Location.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <Button title="Locate User" onPress={getLocationHandler} />
        <Button title="Pick on Map" onPress={pickOnMapHandler} />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary800,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  subtitle: {
    color: Colors.primary100,
    marginTop: 8,
  },
});
