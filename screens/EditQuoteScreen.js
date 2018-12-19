import React from "react";
import { Button, Text, TextInput, StyleSheet, View } from "react-native";

export default class EditQuoteScreen extends React.Component {
  static navigationOptions = {
    // title: "Quotes"
    header: null
  };

  constructor(props) {
    super(props);
    const { quote } = this.props.navigation.state.params;
    this.state = {
      id: quote.id,
      text: quote.text,
      source: quote.author,
      author: quote.source,
    };
  }

  render() {
    const { quote } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          defaultValue={quote.text}
          placeholder="text"
          multiline={true}
          autoFocus={true}
          onChangeText={text => this.setState({ text })}
        />
        <TextInput
          style={styles.textInput}
          defaultValue={quote.author}
          placeholder="author"
          autoCapitalize="words"
          onChangeText={author => this.setState({ author })}
        />
        <TextInput
          style={styles.textInput}
          defaultValue={quote.source}
          placeholder="source"
          autoCapitalize="words"
          onChangeText={source => this.setState({ source })}
        />
      <Button title="Edit Quote" onPress={this._onPress} />
      </View>
    );
  }

  _onPress = () => {
    const { id, text, author, source } = this.state;
    const quote = { id, text, author, source };
    this.props.navigation.state.params.editQuote(quote);
    this.props.navigation.goBack();
  };
}

const styles = StyleSheet.create({
  container: {
    margin: 35
  },
  textInput: {}
});
