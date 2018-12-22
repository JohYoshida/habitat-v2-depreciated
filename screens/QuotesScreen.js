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
import Colors from "../constants/Colors";

const { URL } = require("../constants/Constants");

export default class QuotesScreen extends React.Component {
  static navigationOptions = {
    title: "Quotes",
    headerStyle: {
      backgroundColor: Colors.basil_Primary,
    },
    headerTintColor: '#000',
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
        this._shuffleQuoteDisplay();
      });
    });
  }

  render() {
    const AddButton = (
      <TouchableOpacity style={styles.button} onPress={this._navToAddQuote}>
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
      <TouchableOpacity
        style={styles.button}
        onPress={this._shuffleQuoteDisplay}
      >
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
      <TouchableOpacity style={styles.button} onPress={this._navToViewQuotes}>
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
        .then(quotes => {
          this.setState({ quotes, isGettingQuotes: false });
          resolve(quotes);
        })
        .catch(err => {
          console.log("Error!", err);
          reject();
        });
    });
  };

  _postQuote = quote => {
    const { text, author, source } = quote;
    fetch(`${URL}/quotes/${this.state.userToken}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Basic " + this.state.authString,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text, author, source })
    })
      .then(res => res.json())
      .then(json => {
        this._getQuotes();
      })
      .catch(err => console.log("Error!", err));
  };

  _editQuote = quote => {
    const { id, text, author, source } = quote;
    fetch(`${URL}/quotes/${this.state.userToken}/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Basic " + this.state.authString,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text, author, source })
    })
      .then(res => res.json())
      .then(json => {
        this._getQuotes();
      })
      .catch(err => console.log("Error!", err));
  };

  _deleteQuote = id => {
    fetch(`${URL}/quotes/${this.state.userToken}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Basic " + this.state.authString,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        this._getQuotes();
      })
      .catch(err => console.log("Error!", err));
  };

  _navToAddQuote = () => {
    this.props.navigation.navigate("AddQuote", { postQuote: this._postQuote });
  };

  _navToEditQuote = quote => {
    this.props.navigation.navigate("EditQuote", {
      quote,
      editQuote: this._editQuote,
      deleteQuote: this._deleteQuote
    });
  };

  _navToViewQuotes = () => {
    const { quotes, isGettingQuotes } = this.state;
    this.props.navigation.navigate("ViewQuotes", {
      isGettingQuotes,
      quotes,
      refresh: this._getQuotes.bind(this),
      navToEditQuote: this._navToEditQuote.bind(this)
    });
  };

  _shuffleQuoteDisplay = () => {
    const { quotes } = this.state;
    const random = Math.floor(Math.random() * quotes.length);
    this.setState({ quote: quotes[random] });
  };
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 20,
    margin: 5,
    backgroundColor: Colors.basil_Dark,
    borderRadius: 100,
    elevation: 10,
  },
  buttons: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  container: {
    flex: 1,
    // marginTop: 5,
    // backgroundColor: "#4c8c4a"
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
