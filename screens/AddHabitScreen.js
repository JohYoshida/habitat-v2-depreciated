import React from "react";
import { Button, Text, TextInput, StyleSheet, View } from "react-native";
import ColorSelector from "../components/ColorSelector";

export default class AddHabitScreen extends React.Component {
  static navigationOptions = {
    // title: "Habits"
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      habit: "",
      color: "",
      noNameWarning: false,
      usedNameWarning: false
    };
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
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="New Habit"
          autoFocus={true}
          onChangeText={habit => this.setState({ habit })}
        />
        {warning}
        <ColorSelector pickColor={this._pickColor.bind(this)} />
        <Button title="Add Habit" onPress={this._onPress} />
      </View>
    );
  }

  _onPress = () => {
    this.setState({ noNameWarning: false, usedNameWarning: false });
    const { habits, postHabit } = this.props.navigation.state.params;
    const { habit, color } = this.state;
    if (!habit) {
      this.setState({ noNameWarning: true });
    } else {
      let warning = new Promise((resolve, reject) => {
        habits.forEach(item => {
          if (item.name === habit) {
            this.setState({ usedNameWarning: true });
            resolve({ used: true });
          }
        });
        resolve({ used: false });
      });
      warning.then(msg => {
        if (!msg.used) {
          postHabit(habit, color);
          this.props.navigation.goBack();
        }
      });
    }
  };

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
