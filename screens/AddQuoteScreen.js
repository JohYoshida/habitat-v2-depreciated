import React from "react";
import { Button, Text, TextInput, ScrollView, StyleSheet, View } from "react-native";

export default class AddQuoteScreen extends React.Component {
  static navigationOptions = {
    // title: "Quotes"
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      author: "",
      source: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="text"
            multiline={true}
            autoFocus={true}
            onChangeText={text => this.setState({ text })}
            />
          <TextInput
            style={styles.textInput}
            placeholder="author"
            autoCapitalize="words"
            onChangeText={author => this.setState({ author })}
            />
          <TextInput
            style={styles.textInput}
            placeholder="source"
            autoCapitalize="words"
            onChangeText={source => this.setState({ source })}
            />
          <Button title="Add Quote" onPress={this._onPress} />
        </ScrollView>
        <View style={styles.container}></View>
      </View>
    );
  }

  _onPress = () => {
    const { text, author, source } = this.state;
    const quote = { text, author, source };
    this.props.navigation.state.params.postQuote(quote);
    this.props.navigation.goBack();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    margin: 35
  },
  textInput: {}
});
