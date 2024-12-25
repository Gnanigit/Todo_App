import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let copy = [...taskItems];
    copy.splice(index, 1);
    setTaskItems(copy);
  };
  return (
    <View style={styles.container}>
      <View style={styles.to_do_wrapper}>
        <Text style={styles.heading}>Today's Tasks</Text>
        <View style={styles.tasks}>
          {taskItems.map((task, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={task} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboard_main}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Add a Task"
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.add_button}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  to_do_wrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  heading: {
    fontWeight: "bold",
    color: "#353935",
    fontSize: 30,
    textShadowColor: "#36454F",
    textShadowOffset: { width: 0.5, height: 1 },
    textShadowRadius: 5,
  },

  tasks: {
    marginTop: 20,
  },
  keyboard_main: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    padding: 15,
    width: 330,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  inputFocused: {
    borderColor: "#007BFF",
    borderWidth: 2,
  },
  addWrapper: {
    width: 58,
    height: 58,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  add_button: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    opacity: 0.6,
  },
});
