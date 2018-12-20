import React from "react";
import { AsyncStorage, StyleSheet, View } from "react-native";
import Calendar from "../components/Calendar";

const moment = require("moment");
const { URL } = require("../constants/Constants");

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
    this._fetchData();
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
          onPressSubmitEdits={this._onPressSubmitEdits}
          onPressDelete={this._onPressDelete}
          goForwardYear={this._goForwardYear}
          goBackYear={this._goBackYear}
        />
      </View>
    );
  }

  _goForwardYear = () => {
    let { year } = this.state;
    let data = {};
    year++;
    this.setState({ year, data });
    this._fetchData();
  };

  _goBackYear = () => {
    let { year } = this.state;
    let data = {};
    year--;
    this.setState({ year, data });
    this._fetchData();
  };

  _fetchData = () => {
    const { habit } = this.props.navigation.state.params;
    this.props.navigation.state.params.getAsyncKeys().then(res => {
      const { userToken, authString } = res;
      let { year, data } = this.state;
      // Get days associated with habit
      fetch(`${URL}/users/${userToken}/habits/${habit.id}/${year}`)
        .then(res => res.json())
        .then(json => {
          json.forEach(row => {
            data[`${row.month}-${row.day}`] = {
              id: row.id,
              habit_id: row.habit_id,
              value: row.value
            };
          });
          this.setState({ userToken, authString, data });
        })
        .catch(err => console.log("Error!", err));
    });
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
          data[`${json.data.month}-${json.data.day}`] = json.data;
          this.setState({ data });
        }
      })
      .catch(err => console.log("Error!", err));
  };

  _onPressSubmitEdits = newData => {
    const { userToken, year } = this.state;
    const { habit_id, month, day, newValue } = newData;
    fetch(
      `${URL}/users/${userToken}/habits/${habit_id}/${year}/${month}/${day}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ newValue })
      }
    )
      .then(res => {
        // console.log(res.json());
        let { data } = this.state;
        data[`${month}-${day}`].value = newValue;
        this.setState({ data });
      })
      .catch(err => console.log(error));
  };

  _onPressDelete = (habit_id, month, day) => {
    const { userToken, year } = this.state;
    fetch(
      `${URL}/users/${userToken}/habits/${habit_id}/${year}/${month}/${day}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "DELETE"
        }
      }
    )
      .then(() => {
        let { data } = this.state;
        delete data[`${month}-${day}`];
        this.setState({ data });
      })
      .catch(err => console.log(error));
  };
}

const styles = StyleSheet.create({
  container: {}
});
