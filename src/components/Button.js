import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button(props) {
  const styles = StyleSheet.create({
    button: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      backgroundColor: props.bg,
      borderRadius: 8.5,
    },
    text: {
      color: props.color,
      fontFamily: "Manrope_Bold",
      textAlign: "center",
      fontSize: 20,
    },
  });
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}
