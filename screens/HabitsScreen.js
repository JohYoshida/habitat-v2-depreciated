import React from "react";
import {
  Alert,
  Button,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Calendar from "../components/Calendar";
import HabitsList from "../components/HabitsList";
import ColorPicker from "../components/ColorPicker";

const URL = "https://habitat-exp.herokuapp.com";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    // header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      habit: "",
      habitModal: false,
      newHabitModal: false,
      newHabitName: "",
      newHabitColor: "",
      habits: [],
      calendarData: {}
    };
  }

  componentDidMount() {
    this._getHabits();
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.newHabitModal}
          onRequestClose={this._hideNewHabitModal.bind(this)}
        >
          <TextInput
            style={styles.textInput}
            autoFocus={true}
            onChangeText={newHabitName => this.setState({ newHabitName })}
          />
          <ColorPicker pickColor={this._pickColor.bind(this)} />
          <Button title="Add Habit" onPress={this._postHabit.bind(this)} />
        </Modal>

        <Modal
          animationType="slide"
          visible={this.state.habitModal}
          onRequestClose={this._hideCalendar.bind(this)}
        >
          <Calendar
            habit={this.state.habit}
            data={this.state.calendarData}
            toggle={this._toggleDay.bind(this)}
          />
        </Modal>

        <ScrollView style={styles.container}>
          <HabitsList
            habits={this.state.habits}
            onPress={this._showCalendar.bind(this)}
            onLongPress={this._deleteHabit.bind(this)}
          />
        </ScrollView>

        <TouchableOpacity
          style={styles.button}
          onPress={this._showNewHabitModal.bind(this)}
        >
          <Ionicons
            style={styles.icon}
            name={
              Platform.OS === "ios"
                ? `ios-add${focused ? "" : "-outline"}`
                : "md-add"
            }
            color="white"
          />
        </TouchableOpacity>
      </View>
    );
  }

  _deleteHabit(name) {
    fetch(URL + "/habits", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "DELETE"
      },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(json => this._getHabits())
      .catch(err => console.log("Error!", err));
  }

  _getHabits() {
    fetch(URL + "/habits")
      .then(res => res.json())
      .then(json => this.setState({ habits: json }))
      .catch(err => console.log("Error!", err));
  }

  _hideCalendar() {
    this.setState({ habitModal: false });
  }

  _hideNewHabitModal() {
    this.setState({ newHabitModal: false });
  }

  _pickColor(color) {
    this.setState({ newHabitColor: color });
  }

  _postHabit() {
    fetch(URL + "/habits", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.newHabitName,
        color: this.state.newHabitColor
      })
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ newHabitModal: false });
        this._getHabits();
      })
      .catch(err => console.log("Error!", err));
  }

  _showCalendar(habit) {
    fetch(`${URL}/habits/${habit.name}/2018`)
      .then(res => res.json())
      .then(json => JSON.parse(json.rows))
      .then(json =>
        this.setState({ habit, habitModal: true, calendarData: json })
      )
      .catch(err => console.log("Error!", err));
  }

  _showNewHabitModal() {
    this.setState({ newHabitModal: true });
  }

  _toggleDay(habit, key, bool) {
    const words = habit.split(" ");
    const habitParam = words.join("%20");
    fetch(`${URL}/habits/${habitParam}/2018`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        habit,
        day: key,
        completed: bool
      })
    })
      .then(res => res.json())
      .then(json => {
        // TODO: send alert if calendar can't update
        if (json.msg) {
          return true;
        } else {
          return false;
        }
      })
      .catch(err => console.log("Error!", err));
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 20,
    margin: 30,
    marginLeft: 110,
    marginRight: 110,
    backgroundColor: "#2196F3",
    borderRadius: 100
  },
  container: {
    flex: 1
  },
  icon: {
    fontSize: 100
  },
  textInput: {
    marginTop: 50,
    marginBottom: 10,
    paddingBottom: 10,
    fontSize: 20,
    alignSelf: "center"
  }
});
