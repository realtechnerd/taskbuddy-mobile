import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function Input(props) {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      secureTextEntry={props.password}
      keyboardType={props.type}
      autoCapitalize="none"
      value={props.value}
      onChangeText={props.onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 18,
    fontSize: 18,
    backgroundColor: "#f1f1f1",
    fontFamily: "Manrope_Bold",
    borderRadius: 8.5,
    marginBottom: 15,
    fontWeight: "normal",
  },
});
