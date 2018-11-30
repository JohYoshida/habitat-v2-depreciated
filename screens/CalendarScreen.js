import React from "react";
import { StyleSheet, View } from "react-native";
import Year from "../components/Year";

export default class CalendarScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", ""),
    };
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { habit } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Year habit={habit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
