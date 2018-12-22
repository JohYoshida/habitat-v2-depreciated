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
    const { color } = habit
    let textColor;
    if (color === "tomato" || color === "blueberry" || color === "grape" || color === "graphite" || color === "default") {
      textColor = "white";
    } else textColor = "black";
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
            backgroundColor: Colors[`${habit.color}_Primary`],
            borderColor: Colors[`${habit.color}_Dark`]
          }}
        >
          <Text style={styles[`name_${textColor}`]}>{habit.name}</Text>
          <Text style={styles[`date_${textColor}`]}>Created at {habit.createdAt}</Text>
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
  name_white: {
    fontSize: 15,
    color: "white"
  },
  name_black: {
    fontSize: 15,
    color: "black"
  },
  date_white: {
    fontSize: 10,
    color: "white"
  },
  date_black: {
    fontSize: 10,
    color: "black"
  },

});

export default HabitListItem;
