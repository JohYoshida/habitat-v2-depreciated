import React from 'react';
import {
  View
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    // header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
