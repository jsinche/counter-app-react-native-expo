import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

interface Props {
  label: string;
  //Methods
  onPress: () => void;
  onLongPress: () => void;
  position?: "right" | "left";
}

export default function ({
  label,
  onPress,
  onLongPress,
  position = "right",
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.floatingButton,
        position === "right" ? styles.positionRight : styles.positionLeft,
        pressed ? { opacity: 0.7 } : { opacity: 1 },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Text style={{ color: "white", fontSize: 20 }}>{label}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#65558F",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000", // Solo para iOS
    shadowOffset: { width: 0, height: 4 }, // Solo para iOS
    shadowOpacity: 0.3,
    elevation: 3,
    shadowRadius: 4,
  },
  positionRight: {
    right: 20,
  },
  positionLeft: {
    left: 20,
  },
});
