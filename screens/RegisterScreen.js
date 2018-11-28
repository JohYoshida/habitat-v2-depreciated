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

const URL = "https://habitat-exp.herokuapp.com";

export default class RegisterScreen extends React.Component {
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
    const placeholderEmail = navigation.getParam("email", "email");
    const placeholderPassword = navigation.getParam("password", "password");
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text>Register</Text>
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
          <Button onPress={this._register} title="Register" />
        </View>
        <View style={styles.alt}>
          <Text>Already have an account?</Text>
          <Button onPress={this._navToSignIn} title="Sign In" />
        </View>
        <View style={styles.messages}>
          <Text>{this.state.error}</Text>
        </View>
      </View>
    );
  }

  _register = async () => {
    const { email, password } = this.state;
    if (email && password) {
      const auth = "Basic " + base64.encode(`${email}:${password}`);
      await fetch(URL + "./users", {
        method: "POST",
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
            AsyncStorage.setItem("userToken", "abc");
            this.props.navigation.navigate("App");
          } else {
            this.setState({ error: json.msg });
          }
        })
        .catch(err => console.log("Error!", err));
    } else if (!email) {
      this.setState({ error: "Email cannot be blank!" });
    } else if (!password) {
      this.setState({ error: "Password cannot be blank!" });
    }
  };

  _navToSignIn = () => {
    this.props.navigation.navigate("SignIn", {
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
