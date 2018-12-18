import React from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { URL } = require("../constants/Constants");

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Quotes"
    // header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 20,
    margin: 30,
    marginLeft: 110,
    marginRight: 110,
    backgroundColor: "#2196F3",
    borderRadius: 100
  },
  container: {
    flex: 1,
    marginTop: 5
  },
  icon: {
    fontSize: 100
  },
  textInput: {
    marginTop: 50,
    marginBottom: 10,
    paddingBottom: 10,
    fontSize: 20,
    alignSelf: "center"
  }
});
