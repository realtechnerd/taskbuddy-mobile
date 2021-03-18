import React from "react";
import { Text, StyleSheet } from "react-native";
import { Surface } from "react-native-paper";

export default function Error(props) {
  return (
    <Surface style={styles.surface}>
      <Text style={styles.text}>{props.errorMsg}</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  text: {
    fontFamily: "Manrope_Bold",
    fontSize: 20,
    color: "#ff4b2b",
  },
});
