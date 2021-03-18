import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import DashHeader from "../components/DashHeader";
import * as firebase from "firebase";
import { firestoreApp } from "../firebase";
import { FAB, Card, IconButton } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons as MCI } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

export default function Dash({ navigation }) {
  const [items, setItems] = useState();
  const keyboardRef = useRef("");
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }

  function getTasks() {
    setLoading(true);
    firestoreApp
      .collection(`todos/${currentUser.uid}/tasks/`)
      .orderBy("due", "asc")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setItems(items);
        setLoading(false);
      });
  }

  function addTask() {
    const newTask = {
      title,
      id: guidGenerator(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      due: !due ? "" : moment(due).toDate(),
    };

    firestoreApp
      .collection(`todos/${currentUser.uid}/tasks/`)
      .doc(newTask.id)
      .set(newTask)
      .catch((err) => {
        console.error(err);
      });

    setTitle("");
    setDue("");
  }

  function deleteTask(task) {
    firestoreApp
      .collection(`todos/${currentUser.uid}/tasks/`)
      .doc(task.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getTasks();
  }, []);

  function handleSubmit() {
    if (!title.trim()) {
      keyboardRef.current.focus();
    } else {
      addTask();
    }
  }

  return (
    <>
      <DashHeader title="Welcome" appbartitle="TaskBuddy" />

      <View
        style={{
          flexDirection: "row",
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 15,
          paddingBottom: -15,
          borderRadius: 15,
        }}
      >
        <TextInput
          placeholder="Add a task."
          style={styles.input}
          ref={keyboardRef}
          value={title}
          onChangeText={setTitle}
        />
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setDatePickerVisibility(true)}
        >
          <Text style={styles.button}>
            <MCI name="calendar" size={28} color="white" />
          </Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setDue(date);
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
        minimumDate={Date.now()}
      />

      {!loading ? (
        <ScrollView>
          {!items ? (
            <Text>No Tasks!</Text>
          ) : (
            <View style={styles.tasks}>
              {items &&
                items.map((i) => (
                  <Card.Title
                    key={i.id}
                    title={i.title}
                    titleNumberOfLines={3}
                    titleStyle={{ fontFamily: "Manrope_Bold" }}
                    subtitle={
                      !i.due.seconds
                        ? ""
                        : `Due: ${moment.unix(i.due.seconds).format("LL")}`
                    }
                    subtitleStyle={{
                      fontFamily: "Manrope_Bold",
                    }}
                    right={(props) => (
                      <IconButton
                        {...props}
                        icon="checkbox-blank-circle-outline"
                        color="#ff416c"
                        onPress={() => deleteTask(i)}
                      />
                    )}
                    style={styles.card}
                  />
                ))}
            </View>
          )}
        </ScrollView>
      ) : (
        <Text style={styles.loader}>Loading.</Text>
      )}

      <FAB
        style={styles.fab}
        large
        icon="plus"
        animated={true}
        onPress={handleSubmit}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tasks: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#ff4b2b",
  },
  input: {
    padding: 15,
    fontSize: 20,
    backgroundColor: "#ddd",
    fontFamily: "Manrope_Bold",
    color: "#333",
    flex: 1,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    fontWeight: "normal",
  },
  button: {
    padding: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff4b2b",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  loader: {
    textAlign: "center",
    fontFamily: "Manrope_Bold",
    padding: 20,
    fontSize: 25,
  },
});
