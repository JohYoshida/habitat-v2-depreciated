import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this._goToApp} title="Sign In" />
      </View>
    );
  }

  _goToApp = () => {
    this.props.navigation.navigate("App");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
