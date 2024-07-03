import React from "react";
import { Alert, Button, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

const ImagePicker = () => {
  const [cameraPermissionInfo, requestPermisson] = useCameraPermissions();

  // 카메라 권한 요청 (IOS 호환 시 필요 / android는 자동으로 이루어짐)
  const verifyPermissions = async () => {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      // 아직 권한 요청을 받은 적이 없음
      const permissionRes = await requestPermisson();
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

    /**
     * 이미지 객체
     * cancelled: boolean // 사진 선택 취소 여부
     * height: number
     * width: number
     * type: 'image' || ... //
     * uri: string // 이미지가 저장 된 실제 경로
     */
  };

  return (
    <View>
      <View></View>
      <Button title="take image" onPress={takeImageHandler} />
    </View>
  );
};

export default ImagePicker;
