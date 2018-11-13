import React, { Component } from "react";
import { Alert, Text, TouchableOpacity, StyleSheet, View } from "react-native";

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
          style={styles.habit}
          key={habit.id}
          onPress={this._onPress.bind(this, habit.name)}
          onLongPress={this._onLongPress.bind(this, habit.name)}
        >
          <View>
            <Text style={styles.name}>{habit.name}</Text>
            <Text style={styles.date}>Created at {habit.createdAt}</Text>
          </View>
        </TouchableOpacity>
      );
    });
    return Habits;
  }

  _onPress(name) {
    this.props.onPress(name);
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
  habit: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#2196F3"
  },
  name: {
    fontSize: 15,
    color: "white"
  },
  date: {
    fontSize: 10,
    color: "white"
  }
});

export default HabitsList;
