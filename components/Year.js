import React from "react";
import {
  AsyncStorage,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const moment = require("moment");
const { URL, Months } = require("../constants");

class Year extends React.Component {
  static navigationOptions = {
    // header: null,
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
    const { habitID } = this.props;
    this._getAsyncKeys().then(res => {
      const { userToken, authString } = res;
      let { year, data } = this.state;
      // Get days associated with habit calendar
      fetch(`${URL}/users/${userToken}/habits/${habitID}/${year}`)
        .then(res => res.json())
        .then(json => {
          json.forEach(row => {
            data[`${row.month}-${row.day}`] = row.value;
          });
          this.setState({ data, userToken, authString });
        })
        .catch(err => console.log("Error!", err));
    });
  }

  render() {
    const { year, data } = this.state;
    const Calendar = this._makeCalendar(data);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={this._goBackYear}>
            <Ionicons
              name={
                Platform.OS === "ios"
                  ? `ios-arrow-back${focused ? "" : "-outline"}`
                  : "md-arrow-back"
              }
              style={styles.icon}
              color="black"
            />
          </TouchableOpacity>
          <Text style={styles.text}>{ year }</Text>
          <TouchableOpacity onPress={this._goForwardYear}>
            <Ionicons
              name={
                Platform.OS === "ios"
                  ? `ios-arrow-forward${focused ? "" : "-outline"}`
                  : "md-arrow-forward"
              }
              style={styles.icon}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.year}>{ Calendar }</View>
      </ScrollView>
    );
  }

  _getAsyncKeys = async () => {
    let data = {}
    try {
      await AsyncStorage.multiGet(["userToken", "authString"]).then(res => {
        data =  { userToken: res[0][1], authString: res[1][1] };
      });
    } catch (err) {
      console.log("Error!", err);
    }
    return data;
  };

  _postDay = (month, day) => {
    const { habitID } = this.props;
    const { data, year, userToken } = this.state;
    fetch(`${URL}/users/${userToken}/habits/${habitID}/${year}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        day,
        month,
        value: 1
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

  _goBackYear = () => {
    console.log("back");
  };

  _goForwardYear = () => {
    console.log("forward");
  };

  _makeCalendar = (data) => {
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
              onPress={this._postDay.bind(this, month, i)}
            >
              <View style={styles.complete}>
                <Text>{i}</Text>
                <Text>{data[key].value}</Text>
              </View>
            </TouchableOpacity>
          );
        } else {
          Days.push(
            <TouchableOpacity
              key={key}
              onPress={this._postDay.bind(this, month, i)}
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
  };
}

const styles = StyleSheet.create({
  container: {},
  buttons: {
    flex: 1,
    alignSelf: "center",
    alignContent: "space-between",
    flexDirection: "row"
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
  icon: {
    fontSize: 36,
    marginLeft: 20,
    marginRight: 20,
  }
});

export default Year;
