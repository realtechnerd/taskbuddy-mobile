import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Appbar, Menu } from "react-native-paper";
import moment from "moment";
import { useAuth } from "../contexts/AuthContext";

export default function DashHeader(props) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { logout } = useAuth();

  return (
    <>
      <StatusBar backgroundColor="#ff416c" />
      <Appbar style={styles.appbar}>
        <Appbar.Content
          title={props.appbartitle}
          titleStyle={{ fontFamily: "LeckerliOne" }}
        />
        <Menu
          onDismiss={closeMenu}
          visible={visible}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={openMenu}
              color="#fff"
            />
          }
        >
          <Menu.Item
            icon="web"
            title="TB Web"
            onPress={() =>
              Linking.openURL("https://realtechnerd.github.io/taskbuddy/")
            }
            titleStyle={{ fontFamily: "Manrope_Bold" }}
          />
          <Menu.Item
            icon="logout"
            title="Sign Out"
            onPress={logout}
            titleStyle={{ fontFamily: "Manrope_Bold" }}
          />
        </Menu>
      </Appbar>
      <LinearGradient colors={["#ff416c", "#ff4b2b"]}>
        <View style={styles.header}>
          <Text style={styles.text}>{props.title}</Text>
          <Text style={styles.subtext}>
            Today is {moment(new Date()).format("LL")}
          </Text>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 100,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  text: {
    fontSize: 35,
    color: "#fff",
    fontFamily: "Manrope_Bold",
  },
  subtext: {
    fontSize: 18,
    fontFamily: "Manrope_Bold",
    color: "#fff",
  },
  appbar: {
    backgroundColor: "#ff416c",
    shadowOpacity: 0,
    elevation: 0,
    fontFamily: "Manrope_Bold",
  },
});
