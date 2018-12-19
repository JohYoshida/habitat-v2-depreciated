import React from "react";
import { Platform, Text, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoadingPanel from "./LoadingPanel";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { quote, isLoading } = this.props;
    if (isLoading) {
      return <LoadingPanel />;
    } else {
      if (!quote) {
        return <View />;
      } else {
        return (
          <ScrollView style={styles.container}>
            <Ionicons
              style={styles.icon_left}
              name={
                Platform.OS === "ios"
                  ? `ios-quote${focused ? "" : "-outline"}`
                  : "md-quote"
              }
            />
            <Text style={styles.text}>{quote.text}</Text>
            <Ionicons
              style={styles.icon_right}
              name={
                Platform.OS === "ios"
                  ? `ios-quote${focused ? "" : "-outline"}`
                  : "md-quote"
              }
            />
            <Text style={styles.author}>{quote.author}</Text>
            <Text style={styles.source}>{quote.source}</Text>
          </ScrollView>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignSelf: "center"
  },
  text: {
    textAlign: "center",
    fontSize: 20
  },
  author: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 15
  },
  source: {
    textAlign: "left",
    fontStyle: "italic",
    fontSize: 15,
    marginBottom: 20
  },
  icon_left: {
    fontSize: 20,
    alignSelf: "flex-start"
  },
  icon_right: {
    fontSize: 20,
    alignSelf: "flex-end",
    marginBottom: 10
  }
});
