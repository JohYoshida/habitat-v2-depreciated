import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native';

const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: {},
    };
  }

  componentDidMount() {
    Months.forEach(month => {
      const { data } = this.props;
      let record = data[month].split("");;
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
      const { data } = this.props;
      let record = data[month].split("");
      let i = 1;
      const Days = [];
      record.forEach(char => {
        const key = `${month}-${i}`;
        if (this.state.completed[key]) {
          Days.push(
            <TouchableOpacity
              key={key}
              onPress={this._onPress.bind(this, this.props.habit, key)}
            >
              <View style={styles.complete} >
                <Text>{ i }</Text>
              </View>
            </TouchableOpacity>
          );
        } else {
          Days.push(
            <TouchableOpacity
              key={key}
              onPress={this._onPress.bind(this, this.props.habit, key)}
            >
              <View style={styles.incomplete} >
                <Text>{ i }</Text>
              </View>
            </TouchableOpacity>
          );
        }
        i++;
      });
      Year.push(
        <View style={styles.month} key={month}>
          <Text>{ month }</Text>
          { Days }
        </View>
      );
    });

    return (
      <ScrollView>
        <Text style={styles.text}>{this.props.habit}</Text>
        <View style={styles.year}>
          { Year }
        </View>
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
  complete: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#2196F3",
  },
  incomplete: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#E3F2FD",
  },
  month: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  text: {
    alignSelf: "center",
    fontSize: 30,
  },
  year: {
    flex: 1,
    flexDirection: "row",
    marginTop: 12,
  },
});

export default Calendar;
