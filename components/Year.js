import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const moment = require("moment");
const { Months } = require("../constants");

class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { data } = this.props;
    const Year = [];
    Months.forEach(month => {
      const Days = [];
      let daysInMonth = moment().month(month).daysInMonth();
      for (var i = 1; i <= daysInMonth; i++) {
        const key = `${month}-${i}`;
        if (data[key]) {
          Days.push(
            <TouchableOpacity
              key={key}
              onPress={this.props.onPress.bind(this, month, i)}
              onLongPress={this.props.onLongPress.bind(this, month, i, data[key])}
            >
              <View style={styles.complete}>
                <Text>{i}</Text>
                <Text>{data[key]}</Text>
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
                <Text>{i}</Text>
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
  complete: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#2196F3"
  },
});

export default Year;
