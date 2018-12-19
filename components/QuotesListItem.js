import React, { PureComponent } from "react";
import { Alert, Text, TouchableOpacity, StyleSheet, View } from "react-native";
class QuotesListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { quote, navToEditQuote } = this.props;
    return (
      <TouchableOpacity onPress={navToEditQuote.bind(this, quote)}>
        <View style={styles.container} >
          <Text style={styles.name}>{quote.text}</Text>
          <Text style={styles.date}>{quote.author}</Text>
          <Text style={styles.date}>{quote.source}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5
  },
  name: {
    fontSize: 15,
    color: "black"
  },
  date: {
    fontSize: 10,
    color: "black"
  }
});

export default QuotesListItem;
