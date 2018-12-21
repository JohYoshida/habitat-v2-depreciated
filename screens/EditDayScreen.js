import React from "react";
import { Alert, Button, Text, TextInput, StyleSheet, View } from "react-native";

export default class EditDayScreen extends React.Component {
  static navigationOptions = {
    // title: "Day"
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      noValueWarning: false,
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.navigation.state.params.selectedDay.value });
  }

  render() {
    let warning;
    if (this.state.noValueWarning) {
      warning = (
        <View style={styles.warning}>
          <Text>Please provide a value</Text>
        </View>
      );
    }
    const { selectedDay } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text>{selectedDay.month} {selectedDay.day} {selectedDay.year}</Text>
        <TextInput
          style={styles.textInput}
          placeholder={selectedDay.value}
          defaultValue={selectedDay.value}
          autoFocus={true}
          onChangeText={value => this.setState({ value })}
        />
        {warning}
        <Button title="Edit" onPress={this._edit} />
        <Button title="Delete" onPress={this._delete} />
      </View>
    );
  }

  _edit = () => {
    this.setState({ noValueWarning: false });
    const { selectedDay, postDay } = this.props.navigation.state.params;
    const { value } = this.state;
    if (!value) {
      this.setState({ noValueWarning: true });
    } else {
      postDay(selectedDay, value);
      this.props.navigation.goBack();
    }
  };

  _delete = () => {
    Alert.alert(
      "Are you sure you want to delete this day?",
      "This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            const { selectedDay, deleteDay } = this.props.navigation.state.params;
            const { habit_id, month, day } = selectedDay;
            deleteDay(habit_id, month, day);
            this.props.navigation.goBack();
          }
        }
      ]
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 35
  },
  warning: {
    alignItems: "center"
  },
  textInput: {}
});
