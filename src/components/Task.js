import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square}></TouchableOpacity>
        <Text styles={styles.itemText}>{props.text}</Text>
      </View>
      {/* <View style={styles.circular}></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: ": #FFF",
    padding: 15,
    boraderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55CBF6",
    opacity: 0.4,
    boraderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    backgroundColor: "#55CBF6",
    borderWidth: 2,
    borderRadious: 5,
  },
});

export default Task;
