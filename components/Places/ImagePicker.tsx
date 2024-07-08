import React, { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";

interface Props {
  imageUrl: string | undefined;
  setImageUrl: (imageUrl: string) => void;
}

const ImagePicker = ({ imageUrl, setImageUrl }: Props) => {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

  // 카메라 권한 요청 (IOS 호환 시 필요 / android는 자동으로 이루어짐)
  const verifyPermissions = async () => {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      // 아직 권한 요청을 받은 적이 없음
      const permissionRes = await requestPermission();
      return permissionRes.granted; // boolean
    }

    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      // 권한이 허용되지 않은 경우
      Alert.alert(
        "접근 권한이 없습니다.",
        "이 앱을 사용하려면 카메라 접근 권한이 필요합니다."
      );
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true, // 사용자가 사진을 선택하기 전 편집 할 수 있도록 함
      aspect: [16, 9], // 사진 비율
      quality: 0.5, // 0 ~ 1
    });

    !image.canceled && setImageUrl(image.assets[0].uri);
  };

  return (
    <View>
      <Text style={styles.subtitle}>사진선택</Text>
      <View style={styles.imagePreview}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <Text style={styles.subtitle}>No Image.</Text>
        )}
      </View>
      <Button title="take image" onPress={takeImageHandler} />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
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
  subtitle: {
    marginTop: 8,
    color: Colors.primary100,
  },
});
