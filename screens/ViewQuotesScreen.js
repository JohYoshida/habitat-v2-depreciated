import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import QuotesList from "../components/QuotesList";

export default class ViewQuotesScreen extends React.Component {
  static navigationOptions = {
    // title: "Quotes"
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      isGettingQuotes,
      quotes,
      refresh
    } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <QuotesList
          isLoading={isGettingQuotes}
          quotes={quotes}
          onRefresh={refresh}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35
  }
});
