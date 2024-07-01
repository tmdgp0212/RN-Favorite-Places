import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PlaceType } from "../../types/place";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

interface Props {
  places: PlaceType[];
}

const PlacesList = ({ places }: Props) => {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No Placee added yel - start adding some!
        </Text>
      </View>
    );
  }
  const onPress = () => {};
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onPress={onPress} />}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
