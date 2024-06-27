import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PlaceType } from "../../types/place";
interface Props {
  place: PlaceType;
  onPress: () => void;
}

const PlaceItem = ({ place, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Image source={{ uri: require(place.imageUri) }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
