import React, { PureComponent } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";

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
      case "tomato":
        primary = Colors.tomato_Primary;
        secondary = Colors.tomato_Dark;
        break;
      case "tangerine":
        primary = Colors.tangerine_Primary;
        secondary = Colors.tangerine_Dark;
        break;
      case "banana":
        primary = Colors.banana_Primary;
        secondary = Colors.banana_Dark;
        break;
      case "basil":
        primary = Colors.basil_Primary;
        secondary = Colors.basil_Dark;
        break;
      case "sage":
        primary = Colors.sage_Primary;
        secondary = Colors.sage_Dark;
        break;
      case "peacock":
        primary = Colors.peacock_Primary;
        secondary = Colors.peacock_Dark;
        break;
      case "blueberry":
        primary = Colors.blueberry_Primary;
        secondary = Colors.blueberry_Dark;
        break;
      case "lavender":
        primary = Colors.lavender_Primary;
        secondary = Colors.lavender_Dark;
        break;
      case "grape":
      primary = Colors.grape_Primary;
      secondary = Colors.grape_Dark;
        break;
      case "flamingo":
      primary = Colors.flamingo_Primary;
      secondary = Colors.flamingo_Dark;
        break;
      case "graphite":
      primary = Colors.graphite_Dark;
      secondary = Colors.graphite_Dark;
        break;
      case "default":
      primary = Colors.default_Primary;
      secondary = Colors.default_Dark;
        break;
      default:
    }
    return (
      <TouchableOpacity
        onPress={this._onPress.bind(this, habit)}
        onLongPress={this._onLongPress.bind(this, habit)}
      >
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            padding: 5,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: primary,
            borderColor: secondary
          }}
        >
          <Text style={styles.name}>{habit.name}</Text>
          <Text style={styles.date}>Created at {habit.createdAt}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _onPress(habit) {
    this.props.onPress(habit);
  }

  _onLongPress(habit) {
    this.props.onLongPress(habit);
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
