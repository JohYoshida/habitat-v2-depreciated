import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Colors from "../constants/Colors";
const moment = require("moment");
const { Months } = require("../constants/Constants");

class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, habit } = this.props;
    const Year = [];
    Months.forEach(month => {
      const Days = [];
      let daysInMonth = moment()
        .month(month)
        .daysInMonth();
      for (var i = 1; i <= daysInMonth; i++) {
        const key = `${month}-${i}`;
        if (data[key]) {
          Days.push(
            <TouchableOpacity
              key={key}
              onPress={this.props.onPress.bind(this, month, i)}
              onLongPress={this.props.onLongPress.bind(
                this,
                month,
                i,
                data[key].value,
                data[key].id,
                data[key].habit_id
              )}
            >
              <View style={styles.day}>
                <View style={styles[`${habit.color}_Dark`]}>
                  <Text>{i}</Text>
                  <Text>{data[key].value}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        } else {
          Days.push(
            <TouchableOpacity
              key={key}
              onPress={this.props.onPress.bind(this, month, i)}
              onLongPress={this.props.onLongPress.bind(this, month, i, 0)}
            >
              <View style={styles.day}>
                <View style={styles[`${habit.color}_Light`]}>
                  <Text>{i}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }
      }
      Year.push(
        <View style={styles.month} key={month}>
          <Text>{month}</Text>
          {Days}
        </View>
      );
    });
    return Year;
  }
}

const styles = StyleSheet.create({
  month: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  day: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1
  },
  white: {
    color: "white"
  },
  black: {
    color: "black"
  },
  tomato_Light: {
    flex: 1,
    backgroundColor: Colors.tomato_Light
  },
  tomato_Dark: {
    flex: 1,
    backgroundColor: Colors.tomato_Dark
  },
  tangerine_Light: {
    flex: 1,
    backgroundColor: Colors.tangerine_Light
  },
  tangerine_Dark: {
    flex: 1,
    backgroundColor: Colors.tangerine_Dark
  },
  banana_Light: {
    flex: 1,
    backgroundColor: Colors.banana_Light
  },
  banana_Dark: {
    flex: 1,
    backgroundColor: Colors.banana_Dark
  },
  basil_Light: {
    flex: 1,
    backgroundColor: Colors.basil_Light
  },
  basil_Dark: {
    flex: 1,
    backgroundColor: Colors.basil_Dark
  },
  sage_Light: {
    flex: 1,
    backgroundColor: Colors.sage_Light
  },
  sage_Dark: {
    flex: 1,
    backgroundColor: Colors.sage_Dark
  },
  peacock_Light: {
    flex: 1,
    backgroundColor: Colors.peacock_Light
  },
  peacock_Dark: {
    flex: 1,
    backgroundColor: Colors.peacock_Dark
  },
  blueberry_Light: {
    flex: 1,
    backgroundColor: Colors.blueberry_Light
  },
  blueberry_Dark: {
    flex: 1,
    backgroundColor: Colors.blueberry_Dark
  },
  lavender_Light: {
    flex: 1,
    backgroundColor: Colors.lavender_Light
  },
  lavender_Dark: {
    flex: 1,
    backgroundColor: Colors.lavender_Dark
  },
  grape_Light: {
    flex: 1,
    backgroundColor: Colors.grape_Light
  },
  grape_Dark: {
    flex: 1,
    backgroundColor: Colors.grape_Dark
  },
  flamingo_Light: {
    flex: 1,
    backgroundColor: Colors.flamingo_Light
  },
  flamingo_Dark :{
    flex: 1,
    backgroundColor: Colors.flamingo_Light
  },
  graphite_Light: {
    flex: 1,
    backgroundColor: Colors.graphite_Light
  },
  graphite_Dark: {
    flex: 1,
    backgroundColor: Colors.graphite_Dark
  },
  default_Light: {
    flex: 1,
    backgroundColor: Colors.default_Light
  },
  default_Dark: {
    flex: 1,
    backgroundColor: Colors.default_Dark
  },
});

export default Year;
