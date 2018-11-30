import React from "react";
import { AsyncStorage, StyleSheet, View } from "react-native";
import Calendar from "../components/Calendar";

const moment = require("moment");
const { URL } = require("../constants");

export default class CalendarScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "")
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      userToken: "",
      authString: "",
      year: moment().year(),
      data: {}
    };
  }

  componentDidMount() {
    const { habit } = this.props.navigation.state.params;
    this._getAsyncKeys().then(res => {
      const { userToken, authString } = res;
      let { year, data } = this.state;
      // Get days associated with habit calendar
      fetch(`${URL}/users/${userToken}/habits/${habit.id}/${year}`)
        .then(res => res.json())
        .then(json => {
          json.forEach(row => {
            data[`${row.month}-${row.day}`] = row.value;
          });
          this.setState({ userToken, authString, data });
        })
        .catch(err => console.log("Error!", err));
    });
  }

  render() {
    const { habit } = this.props.navigation.state.params;
    const { year, data } = this.state;
    return (
      <View style={styles.container}>
        <Calendar
          habit={habit}
          year={year}
          data={data}
          onPressDay={this._onPressDay}
        />
      </View>
    );
  }

  _getAsyncKeys = async () => {
    let data = {};
    try {
      await AsyncStorage.multiGet(["userToken", "authString"]).then(res => {
        data = { userToken: res[0][1], authString: res[1][1] };
      });
    } catch (err) {
      console.log("Error!", err);
    }
    return data;
  };

  _onPressDay = (month, day) => {
    const { habit } = this.props.navigation.state.params;
    const { data, year, userToken } = this.state;
    fetch(`${URL}/users/${userToken}/habits/${habit.id}/${year}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        day,
        month,
        value: "1"
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.data) {
          data[`${json.data.month}-${json.data.day}`] = json.data.value;
          this.setState({ data });
        }
      })
      .catch(err => console.log("Error!", err));
  };
}

const styles = StyleSheet.create({
  container: {}
});
