import React from "react";
import {
  Button,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Year from "./Year";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editModalVisible: false,
      selectedDay: {
        day: "",
        month: "",
        year: "",
        value: "",
        newValue: "",
      },
    };
  }

  render() {
    const { selectedDay } = this.state;
    const { year, data } = this.props;
    return (
      <ScrollView>
        <View style={styles.header}>
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

        <View style={styles.year}>
          <Year
            data={data}
            onPress={this.props.onPressDay}
            onLongPress={this._editDay}
          />
        </View>

        <Modal
          animationType="slide"
          visible={this.state.editModalVisible}
          onRequestClose={this._hideEditModal}
        >
        <View style={styles.container}>
          <Text style={styles.text}>{selectedDay.month} {selectedDay.day}</Text>
          <TextInput
            autoFocus={true}
            placeholder="value"
            defaultValue={selectedDay.value}
            onChangeText={newValue => {
              let { selectedDay } = this.state;
              selectedDay.newValue = newValue;
              this.setState({ selectedDay })}
            }
          />
          <Button
            title="Edit"
            onPress={this._submitEdit}
          />
        </View>
        </Modal>
      </ScrollView>
    );
  }

  _editDay = (month, day, value) => {
    const selectedDay = { month, day, value };
    this.setState({ editModalVisible: true, selectedDay });
  }

  _hideEditModal = () => {
    this.setState({ editModalVisible: false });
  }

  _submitEdit = () => {
    this._hideEditModal();
  }

  _goBackYear = () => {
    console.log("back");
  };

  _goForwardYear = () => {
    console.log("forward");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
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
    marginRight: 20,
  }
});

export default Calendar;
