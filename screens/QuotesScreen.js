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
import QuoteDisplay from "../components/QuoteDisplay";

const { URL } = require("../constants/Constants");

export default class QuotesScreen extends React.Component {
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
      quote: {}
    };
  }

  componentDidMount() {
    this._getAsyncKeys().then(() => {
      this._getQuotes().then(() => {
        this._showQuote();
      });
    });
  }

  render() {
    const AddButton = (
      <TouchableOpacity style={styles.button} onPress={this._addQuote}>
        <Ionicons
          style={styles.add}
          name={
            Platform.OS === "ios"
              ? `ios-add${focused ? "" : "-outline"}`
              : "md-add"
          }
          color="white"
        />
      </TouchableOpacity>
    );
    const EggButton = (
      <TouchableOpacity style={styles.button} onPress={this._showQuote}>
        <Ionicons
          style={styles.egg}
          name={
            Platform.OS === "ios"
              ? `ios-egg${focused ? "" : "-outline"}`
              : "md-egg"
          }
          color="white"
        />
      </TouchableOpacity>
    );
    const ListButton = (
      <TouchableOpacity style={styles.button} onPress={this._viewQuotes}>
        <Ionicons
          style={styles.list}
          name={
            Platform.OS === "ios"
              ? `ios-list${focused ? "" : "-outline"}`
              : "md-list"
          }
          color="white"
        />
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <QuoteDisplay
            isLoading={this.state.isGettingQuotes}
            quote={this.state.quote}
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.buttons}>
            {AddButton}
            {EggButton}
            {ListButton}
          </View>
        </View>
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
    return new Promise((resolve, reject) => {
      fetch(`${URL}/quotes/${this.state.userToken}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Basic " + this.state.authString,
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(json => {
        this.setState({ quotes: json, isGettingQuotes: false })
        resolve();
      })
      .catch(err => {
        console.log("Error!", err)
        reject();
      });
    })
  }

  _showQuote = () => {
    const { quotes } = this.state;
    const random = Math.floor(Math.random() * quotes.length);
    this.setState({ quote: quotes[random]});
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 20,
    margin: 5,
    backgroundColor: "#2196F3",
    borderRadius: 100
  },
  buttons: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  container: {
    flex: 1,
    marginTop: 5
  },
  egg: {
    fontSize: 50
  },
  add: {
    fontSize: 30
  },
  list: {
    fontSize: 30
  },
  textInput: {
    marginTop: 50,
    marginBottom: 10,
    paddingBottom: 10,
    fontSize: 20,
    alignSelf: "center"
  },
  top: {
    flex: 3,
    marginBottom: 10
  },
  bottom: {
    flex: 1
  }
});
