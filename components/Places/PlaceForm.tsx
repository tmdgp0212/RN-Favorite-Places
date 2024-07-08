import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import { Location } from "../../types/place";

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState<string>();
  const [pickedLocation, setPickedLocation] = useState<Location>();

  const changeTitleHandler = (value: string) => {
    setEnteredTitle(value);
  };

  const takeImageHandler = (imageUrl: string) => {
    setSelectedImageUri(imageUrl);
  };

  const pickLocationHandler = (location: Location) => {
    setPickedLocation(location);
  };

  const onSubmit = () => {
    console.log("enteredTitle : " + enteredTitle);
    console.log("selectedImageUri : " + selectedImageUri);
    console.log(
      "pickedLocation : " +
        pickedLocation?.latitude +
        ", " +
        pickedLocation?.longitude +
        ", " +
        pickedLocation?.address
    );
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>TITLE</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
        <ImagePicker
          imageUrl={selectedImageUri}
          setImageUrl={takeImageHandler}
        />
        <LocationPicker
          location={pickedLocation}
          setLocation={pickLocationHandler}
        />
        <View style={styles.submitButtonContainer}>
          <Button title="제출" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
  submitButtonContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
});
