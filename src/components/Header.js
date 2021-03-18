import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Header(props) {
  return (
    <>
      <StatusBar backgroundColor="#ff416c" animated={true} />
      <LinearGradient colors={["#ff416c", "#ff4b2b"]}>
        <View style={styles.header}>
          <Text style={styles.text}>{props.title}</Text>
          <Text style={styles.subtext}>{props.subtitle}</Text>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 100,
    paddingLeft: 15,
    paddingBottom: 15,
    paddingRight: 15,
  },
  text: {
    fontSize: 50,
    color: "#fff",
    fontFamily: "Manrope_Bold",
  },
  subtext: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Manrope_Bold",
  },
});
