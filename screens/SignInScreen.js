import React from "react";
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import base64 from "react-native-base64";

const { URL } = require("../constants/Constants");

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      error: ""
    };
  }

  render() {
    const { navigation } = this.props;
    const placeholderEmail = navigation.getParam("email", "");
    const placeholderPassword = navigation.getParam("password", "");
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text>Sign In</Text>
          <TextInput
            placeholder="email"
            defaultValue={placeholderEmail}
            autoFocus={true}
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            placeholder="password"
            defaultValue={placeholderPassword}
            textContentType="password"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
          <Button onPress={this._signIn} title="Sign In" />
        </View>
        <View style={styles.alt}>
          <Text>Need an account?</Text>
          <Button onPress={this._navToRegister} title="Register" />
        </View>
        <View style={styles.messages}>
          <Text>{this.state.error}</Text>
        </View>
      </View>
    );
  }

  _signIn = async () => {
    const { email, password } = this.state;
    const authString = base64.encode(`${email}:${password}`);
    const auth = "Basic " + authString;
    await fetch(URL + "/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.verified) {
          AsyncStorage.setItem("userToken", json.id);
          AsyncStorage.setItem("username", email);
          AsyncStorage.setItem("authString", authString);
          this.props.navigation.navigate("App");
        } else {
          this.setState({ error: json.msg });
        }
      })
      .catch(err => console.log("Error!", err));
  };

  _navToRegister = () => {
    this.props.navigation.navigate("Register", {
      email: this.state.email,
      password: this.state.password
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: "center"
  },
  form: {},
  alt: {
    marginTop: 20
  },
  messages: {
    marginTop: 20
  }
});
