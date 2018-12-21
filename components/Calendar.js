import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Year from "./Year";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: {
        day: "",
        month: "",
        year: "",
        value: "",
        newValue: ""
      }
    };
  }

  render() {
    const { selectedDay } = this.state;
    const { year, data, habit } = this.props;
    return (
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.props.goBackYear}>
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
          <Text style={styles.text}>{year}</Text>
          <TouchableOpacity onPress={this.props.goForwardYear}>
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

        <View style={styles.year}>
          <Year
            habit={habit}
            data={data}
            onPress={this.props.onPressDay}
            onLongPress={this._editDay}
          />
        </View>
      </ScrollView>
    );
  }

  _editDay = (month, day, value, id, habit_id) => {
    const { year } = this.props;
    const { newValue } = this.state.selectedDay;
    const selectedDay = { id, habit_id, year, month, day, value, newValue };
    this.setState({ selectedDay });
    this.props.navToEditDay(selectedDay);
  };
}

const styles = StyleSheet.create({
  header: {
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
  icon: {
    fontSize: 30,
    marginLeft: 20,
    marginRight: 20
  }
});

export default Calendar;
