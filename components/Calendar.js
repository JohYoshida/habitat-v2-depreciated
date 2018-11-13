import React, { Component } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View
} from "react-native";

const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: {}
    };
  }

  componentDidMount() {
    Months.forEach(month => {
      const { data } = this.props;
      let record = data[month].split("");
      let i = 1;
      record.forEach(char => {
        if (char === "1") {
          let { completed } = this.state;
          completed[`${month}-${i}`] = true;
          this.setState({ completed });
        }
        i++;
      });
    });
  }

  render() {
    const Year = [];
    Months.forEach(month => {
      const { data, habit } = this.props;
      let record = data[month].split("");
      let i = 1;
      const Days = [];
      record.forEach(char => {
        const key = `${month}-${i}`;
        if (this.state.completed[key]) {
          let style = "complete_" + habit.color;
          Days.push(
            <TouchableOpacity
              key={key}
              onPress={this._onPress.bind(this, habit, key)}
            >
              <View style={styles[style]}>
                <Text>{i}</Text>
              </View>
            </TouchableOpacity>
          );
        } else {
          let style = "incomplete_" + habit.color;
          Days.push(
            <TouchableOpacity
              key={key}
              onPress={this._onPress.bind(this, habit, key)}
            >
              <View style={styles[style]}>
                <Text>{i}</Text>
              </View>
            </TouchableOpacity>
          );
        }
        i++;
      });
      Year.push(
        <View style={styles.month} key={month}>
          <Text>{month}</Text>
          {Days}
        </View>
      );
    });

    return (
      <ScrollView>
        <Text style={styles.text}>{this.props.habit.name}</Text>
        <View style={styles.year}>{Year}</View>
      </ScrollView>
    );
  }

  _onPress(habit, key) {
    const keys = key.split("-");
    if (this.state.completed[key]) {
      let { completed } = this.state;
      delete completed[key];
      this.setState({ completed });
      this.props.toggle(habit, key, false);
    } else {
      let { completed } = this.state;
      completed[key] = true;
      this.setState({ completed });
      this.props.toggle(habit, key, true);
    }
  }
}

const styles = StyleSheet.create({
  month: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  text: {
    alignSelf: "center",
    fontSize: 30
  },
  year: {
    flex: 1,
    flexDirection: "row",
    marginTop: 12
  },
  complete_red: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#f44336"
  },
  complete_orange: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#FF9800"
  },
  complete_yellow: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#FFEB3B"
  },
  complete_lime: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#CDDC39"
  },
  complete_green: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#4CAF50"
  },
  complete_blue: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#2196F3"
  },
  complete_purple: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#9C27B0"
  },
  complete_indigo: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#3F51B5"
  },
  incomplete_red: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#ffebee"
  },
  incomplete_orange: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#FFF3E0"
  },
  incomplete_yellow: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#FFFDE7"
  },
  incomplete_lime: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#F9FBE7"
  },
  incomplete_green: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#E8F5E9"
  },
  incomplete_blue: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#E3F2FD"
  },
  incomplete_purple: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#F3E5F5"
  },
  incomplete_indigo: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#E8EAF6"
  },
});

export default Calendar;
