import React from "react";
import {
  AsyncStorage,
  Platform,
  Text,
  TouchableOpacity,
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
      userToken: "",
      authString: "",
      isGettingQuotes: true,
      quotes: [],
      quote: "",
    };
  }

  componentDidMount() {
    this._getAsyncKeys().then(() => this._getQuotes())
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.quote}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this._showQuote}
        >
          <Ionicons
            style={styles.icon}
            name={
              Platform.OS === "ios"
                ? `ios-egg${focused ? "" : "-outline"}`
                : "md-egg"
            }
            color="white"
          />
        </TouchableOpacity>
      </View>
    );
  }

  _getAsyncKeys = async () => {
    try {
      await AsyncStorage.multiGet(["userToken", "authString"]).then(res => {
        this.setState({ userToken: res[0][1], authString: res[1][1] });
      });
    } catch (err) {
      console.log("Error!", err);
    }
  };

  _getQuotes = () => {
    this.setState({ isGettingQuotes: true });
    fetch(`${URL}/quotes/${this.state.userToken}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Basic " + this.state.authString,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ quotes: json, isGettingQuotes: false }))
      .catch(err => console.log("Error!", err));
  }

  _showQuote = () => {
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
