import React from "react";
import { Alert, Button, Text, TextInput, StyleSheet, View } from "react-native";
import ColorSelector from "../components/ColorSelector";

export default class EditHabitScreen extends React.Component {
  static navigationOptions = {
    // title: "Edit Habit"
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      habit: {},
      name: "",
      color: "",
      noNameWarning: false,
      usedNameWarning: false
    };
  }

  componentDidMount() {
    const { habit } = this.props.navigation.state.params;
    const { name, color } = habit;
    this.setState({ habit, name, color });
  }

  render() {
    let warning;
    if (this.state.noNameWarning) {
      warning = (
        <View style={styles.warning}>
          <Text>Please provide a name</Text>
        </View>
      );
    }
    if (this.state.usedNameWarning) {
      warning = (
        <View style={styles.warning}>
          <Text>You already have a habit with that name</Text>
        </View>
      );
    }
    const { habit } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="New Habit"
          defaultValue={habit.name}
          autoFocus={true}
          onChangeText={name => this.setState({ name })}
        />
        {warning}
        <ColorSelector pickColor={this._pickColor.bind(this)} color={habit.color}/>
        <Button
          title="Edit Habit"
          onPress={this._edit}
        />
        <Button
          title="Delete Habit"
          onPress={this._delete}
          color="#f44336"
        />
      </View>
    );
  }

  _edit = () => {
    this.setState({ noNameWarning: false, usedNameWarning: false });
    const { habits, editHabit } = this.props.navigation.state.params;
    const { habit, name, color } = this.state;
    if (!name) {
      this.setState({ noNameWarning: true });
    } else {
      editHabit(habit, name, color);
      this.props.navigation.goBack();
    }
  };

  _delete = () => {
    Alert.alert("Delete habit", "Are you sure you want to delete this habit?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => {
          const { habit, name } = this.state;
          this.props.navigation.state.params.deleteHabit(name, habit.id);
          this.props.navigation.goBack();
        }
      }
    ]);
  }

  _pickColor(color) {
    this.setState({ color });
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
