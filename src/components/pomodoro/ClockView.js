import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ClockView = (props) => {
  return (
    <View style={styles.clockviewContainer}>
      <Text style={styles.clockViewHeader}>{props.time.type} Timer</Text>
      <Text style={styles.timeText}>
        {props.time.minutes}:{props.time.seconds}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  clockviewContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },

  clockViewHeader: {
    textAlign: "center",
    fontSize: 30,
    margin: 2,
  },

  timeText: {
    fontSize: 35,
    margin: 1,
  },
});

export default ClockView;
