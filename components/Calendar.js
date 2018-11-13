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

    const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const Year = [];

    Months.forEach(month => {
      const { data } = this.props;
      for (var obj in data) {
        if (month === obj) {
          // console.log(month, data[month]);
          const Days = [];
          for (var i = 1; i <= data[month].length; i++) {
            let key = `${month}-${i}`;
            console.log(month, i, typeof(data[month][i - 1]));
            if (data[month][i - 1] === "1") {
              Days.push(
                <TouchableOpacity
                  key={key}
                  onLongPress={this._onLongPress.bind(this, this.props.habit, key)}
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
                  onLongPress={this._onLongPress.bind(this, this.props.habit, key)}
                >
                  <View style={styles.incomplete} >
                    <Text>{ i }</Text>
                  </View>
                </TouchableOpacity>
              );
            }
          }
          Year.push(
            <View style={styles.month} key={month}>
              <Text>{ month }</Text>
              { Days }
            </View>
          );

        }
      }
    })

    // for (var month in months) {
    //   const days = [];
    //   for (var i = 1; i <= months[month]; i++) {
    //     let key = `${month}-${i}`;
    //     days.push(
    //       <TouchableOpacity
    //         key={key}
    //         onLongPress={this._onLongPress.bind(this, this.props.habit, key)}
    //       >
    //         <View style={styles.complete} >
    //           <Text>{ i }</Text>
    //         </View>
    //       </TouchableOpacity>
    //     );
    //   }
    //   Year.push(
    //     <View style={styles.month} key={month}>
    //       <Text>{ month }</Text>
    //       { days }
    //     </View>
    //   );
    // }

    return (
      <ScrollView>
        <Text style={styles.text}>{this.props.habit}</Text>
        <View style={styles.year}>
          { Year }
        </View>
      </ScrollView>
    );
  }

  _onLongPress(habit, key) {
    if (this.props.days[key]) {
      this.props.toggle(habit, key, false);
    } else {
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
    backgroundColor: "#3672FD",
  },
  incomplete: {
    flex: 0,
    borderWidth: 1,
    height: 40,
    margin: 1,
    backgroundColor: "#adc4f9",
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
