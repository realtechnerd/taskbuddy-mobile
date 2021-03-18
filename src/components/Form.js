import React from "react";
import { StyleSheet, View } from "react-native";

export default function Form(props) {
  return <View style={styles.form}>{props.children}</View>;
}
const styles = StyleSheet.create({
  form: {
    padding: 15,
  },
});
