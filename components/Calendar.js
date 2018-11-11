import React, { Component } from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const months = {
      Jan: 31, Feb: 28, Mar: 31, Apr: 30, May: 31, Jun: 30,
      Jul: 31, Aug: 31, Sep: 30, Oct: 31, Nov: 30, Dec: 31,
    };

    const year = [];
    for (var month in months) {
      const days = [];
      for (var i = 1; i <= months[month]; i++) {
        let key = `${month}-${i}`
        days.push(
          <TouchableOpacity key={key} onPress={this._onPress.bind(this)}>
            <View style={styles.days} >
              <Text>{ i }</Text>
            </View>
          </TouchableOpacity>
        );
      }
      year.push(
        <View style={styles.month} key={month}>
          <Text>{ month }</Text>
          { days }
        </View>
      );
    }

    return (
      <ScrollView>
        <Text style={styles.text}>{this.props.habit}</Text>
        <View style={styles.year}>
          { year }
        </View>
      </ScrollView>
    );
  }

  _onPress() {

  }
}

const styles = StyleSheet.create({
  days: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#486cc9",
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
    marginTop: 24,
  },
});

export default Calendar;
