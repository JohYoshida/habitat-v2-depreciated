import React from "react";
import { AsyncStorage, StyleSheet, View } from "react-native";
import Calendar from "../components/Calendar";
import Colors from "../constants/Colors";

const moment = require("moment");
const { URL } = require("../constants/Constants");

export default class CalendarScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let habit = navigation.getParam("habit");
    let headerTintColor;
    const { color } = habit;
    if (color === "tomato" || color === "blueberry" || color === "grape" || color === "graphite" || color === "default") {
      headerTintColor = "white";
    } else headerTintColor = "black";
    return {
      title: navigation.getParam("title", ""),
      headerStyle: {
        backgroundColor: Colors[`${habit.color}_Primary`],
      },
      headerTintColor,
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
          goForwardYear={this._goForwardYear}
          goBackYear={this._goBackYear}
          navToEditDay={this._navtoEditDay}
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
    const log = data[`${month}-${day}`]
    if (!log) {
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
    } else {
      if (Number(log.value)) {
        let selectedDay = {
          month,
          day,
          habit_id: log.habit_id,
          id: log.id,
        };
        let value = Number(log.value) + 1;
        this._submitEdits(selectedDay, value);
      }
    }


  };

  _submitEdits = (selectedDay, newValue) => {
    const { userToken, year } = this.state;
    const { habit_id, month, day } = selectedDay;
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

  _navtoEditDay = (selectedDay) => {
    this.props.navigation.navigate("EditDay", {
      selectedDay,
      postDay: this._submitEdits.bind(this),
      deleteDay: this._onPressDelete.bind(this)
    });
  }
}

const styles = StyleSheet.create({
  container: {}
});
