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
                <View style={styles[`${habit.color}Primary`]}>
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
                <View style={styles[`${habit.color}Muted`]}>
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
  redPrimary: {
    flex: 1,
    backgroundColor: Colors.redPrimary
  },
  orangePrimary: {
    flex: 1,
    backgroundColor: Colors.orangePrimary
  },
  yellowPrimary: {
    flex: 1,
    backgroundColor: Colors.yellowPrimary
  },
  limePrimary: {
    flex: 1,
    backgroundColor: Colors.limePrimary
  },
  greenPrimary: {
    flex: 1,
    backgroundColor: Colors.greenPrimary
  },
  bluePrimary: {
    flex: 1,
    backgroundColor: Colors.bluePrimary
  },
  purplePrimary: {
    flex: 1,
    backgroundColor: Colors.purplePrimary
  },
  indigoPrimary: {
    flex: 1,
    backgroundColor: Colors.indigoPrimary
  },
  redMuted: {
    flex: 1,
    backgroundColor: Colors.redMuted
  },
  orangeMuted: {
    flex: 1,
    backgroundColor: Colors.orangeMuted
  },
  yellowMuted: {
    flex: 1,
    backgroundColor: Colors.yellowMuted
  },
  limeMuted: {
    flex: 1,
    backgroundColor: Colors.limeMuted
  },
  greenMuted: {
    flex: 1,
    backgroundColor: Colors.greenMuted
  },
  blueMuted: {
    flex: 1,
    backgroundColor: Colors.blueMuted
  },
  purpleMuted: {
    flex: 1,
    backgroundColor: Colors.purpleMuted
  },
  indigoMuted: {
    flex: 1,
    backgroundColor: Colors.indigoMuted
  }
});

export default Year;
