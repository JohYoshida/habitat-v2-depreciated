import React, { PureComponent } from "react";
import { Alert, Text, TouchableOpacity, StyleSheet, View } from "react-native";
class HabitListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { habit } = this.props;
    let primary = "";
    let secondary = "";
    switch (habit.color) {
      case "red":
        primary = "#f44336";
        secondary = "#b71c1c";
        break;
      case "orange":
        primary = "#FF9800";
        secondary = "#E65100";
        break;
      case "yellow":
        primary = "#FFEB3B";
        secondary = "#FDD835";
        break;
      case "lime":
        primary = "#CDDC39";
        secondary = "#827717";
        break;
      case "green":
        primary = "#4CAF50";
        secondary = "#1B5E20";
        break;
      case "blue":
        primary = "#2196F3";
        secondary = "#0D47A1";
        break;
      case "purple":
        primary = "#9C27B0";
        secondary = "#4A148C";
        break;
      case "indigo":
        primary = "#3F51B5";
        secondary = "#1A237E";
        break;
      default:

    }
    return (
      <TouchableOpacity
        onPress={this._onPress.bind(this, habit)}
        onLongPress={this._onLongPress.bind(this, habit.name)}
      >
        <View style={{
          marginLeft: 10,
          marginRight: 10,
          padding: 5,
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: primary,
          borderColor: secondary
        }}>
          <Text style={styles.name}>{habit.name}</Text>
          <Text style={styles.date}>Created at {habit.createdAt}</Text>
        </View>
      </TouchableOpacity>
    );
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
  }
});

export default HabitListItem;
