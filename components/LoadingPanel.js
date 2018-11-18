import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class LoadingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filler} />
        <View style={styles.filler} />
        <View style={styles.ball} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#0D47A1",
    borderRadius: 100,
  },
  filler: {
    backgroundColor: "#54abf0",
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  ball: {
    backgroundColor: "#2196F3",
    height: 50,
    width: 50,
    borderRadius: 100,
  },
});

export default LoadingPanel;
