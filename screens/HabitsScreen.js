import React from "react";
import {
  AsyncStorage,
  Alert,
  Button,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HabitsList from "../components/HabitsList";

const { URL } = require("../constants/Constants");

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Habits"
    // header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      userToken: "",
      authString: "",
      isGettingHabits: true,
      habits: []
    };
  }

  componentDidMount() {
    this._getAsyncKeys().then(res => {
      const { userToken, authString } = res;
      this.setState({ userToken, authString });
      this._getHabits()
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <HabitsList
            isLoading={this.state.isGettingHabits}
            habits={this.state.habits}
            onPress={this._navToCalendar.bind(this)}
            onLongPress={this._deleteHabit.bind(this)}
            onRefresh={this._getHabits.bind(this)}
          />
        </View>

        <View style={styles.bottom}>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={this._navToAddHabit.bind(this)}
            >
              <Ionicons
                style={styles.icon}
                name={
                  Platform.OS === "ios"
                    ? `ios-add${focused ? "" : "-outline"}`
                    : "md-add"
                }
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _getAsyncKeys = async () => {
    let data = {};
    try {
      await AsyncStorage.multiGet(["userToken", "authString"]).then(res => {
        data = { userToken: res[0][1], authString: res[1][1] };
      });
    } catch (err) {
      console.log("Error!", err);
    }
    return data;
  };

  _deleteHabit(name, habit_id) {
    const user_id = this.state.userToken;
    fetch(`${URL}/users/${user_id}/habits`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Basic " + this.state.authString,
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "DELETE"
      },
      body: JSON.stringify({ name, habit_id })
    })
      .then(res => res.json())
      .then(json => {
        this._getHabits();
      })
      .catch(err => console.log("Error!", err));
  }

  _getHabits() {
    this.setState({ isGettingHabits: true });
    fetch(`${URL}/users/${this.state.userToken}/habits`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Basic " + this.state.authString,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ habits: json, isGettingHabits: false }))
      .catch(err => console.log("Error!", err));
  }

  _postHabit = (habit, color) => {
    const colors = [
      "red",
      "orange",
      "yellow",
      "lime",
      "green",
      "blue",
      "purple",
      "indigo"
    ];
    if (color === "") {
      color = colors[Math.floor(Math.random() * 8)];
    }
    fetch(`${URL}/users/${this.state.userToken}/habits`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Basic " + this.state.authString,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: habit,
        color
      })
    })
      .then(res => res.json())
      .then(json => this._getHabits())
      .catch(err => console.log("Error!", err));
  }

  _navToCalendar(habit) {
    this.props.navigation.navigate("Calendar", {
      habit,
      title: habit.name,
      getAsyncKeys: this._getAsyncKeys,
    });
  }

  _navToAddHabit() {
    this.props.navigation.navigate("AddHabit", {
      habits: this.state.habits,
      postHabit: this._postHabit
    });
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
  icon: {
    fontSize: 100,
    paddingHorizontal: 20
  },
  textInput: {
    marginTop: 50,
    marginBottom: 10,
    paddingBottom: 10,
    fontSize: 20,
    alignSelf: "center"
  },
  top: {
    flex: 2,
    marginBottom: 10
  },
  bottom: {
    flex: 1
  }
});
