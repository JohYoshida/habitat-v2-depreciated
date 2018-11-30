import React from "react";
import { StyleSheet, View } from "react-native";
import Year from "../components/Year";

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    // header: null,
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { habit } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Year id={habit.id} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
