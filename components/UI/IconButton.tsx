import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  onPress?: () => void;
}

const IconButton = ({ icon, size, color, onPress }: Props) => {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}
      >
        <Ionicons name={icon} size={size} color={color} />
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
