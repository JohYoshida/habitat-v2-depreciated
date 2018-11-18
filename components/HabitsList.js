import React, { Component } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import LoadingPanel from "./LoadingPanel";

class HabitsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Habits = [];
    this.props.habits.forEach(habit => {
      Habits.push(
        <TouchableOpacity
          key={habit.id}
          onPress={this._onPress.bind(this, habit)}
          onLongPress={this._onLongPress.bind(this, habit.name)}
        >
          <View style={styles[habit.color]}>
            <Text style={styles.name}>{habit.name}</Text>
            <Text style={styles.date}>Created at {habit.createdAt}</Text>
          </View>
        </TouchableOpacity>
      );
    });

    if (this.props.isLoading) {
      return <LoadingPanel />;
    } else {
      return <ScrollView>{Habits}</ScrollView>;
    }
  }

  _onPress(habit) {
    this.props.onPress(habit);
  }

  _onLongPress(name) {
    Alert.alert("Delete habit", "Are you sure you want to delete this habit?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => {
          this.props.onLongPress(name);
        }
      }
    ]);
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 15,
    color: "white"
  },
  date: {
    fontSize: 10,
    color: "white"
  },
  red: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f44336",
    borderColor: "#b71c1c"
  },
  orange: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FF9800",
    borderColor: "#E65100"
  },
  yellow: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFEB3B",
    borderColor: "#FDD835"
  },
  lime: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#CDDC39",
    borderColor: "#827717"
  },
  green: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
    borderColor: "#1B5E20"
  },
  blue: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#2196F3",
    borderColor: "#0D47A1"
  },
  purple: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#9C27B0",
    borderColor: "#4A148C"
  },
  indigo: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#3F51B5",
    borderColor: "#1A237E"
  }
});

export default HabitsList;
