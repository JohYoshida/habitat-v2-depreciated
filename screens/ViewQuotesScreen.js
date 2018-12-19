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
    this.state = {
      quotes: {}
    };
  }

  componentDidMount() {
    const { quotes } = this.props.navigation.state.params;
    this.setState({ quotes });
  }

  render() {
    const {
      isGettingQuotes,
      quotes,
      refresh,
      navToEditQuote
    } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <QuotesList
          isLoading={isGettingQuotes}
          quotes={this.state.quotes}
          onRefresh={this._handleRefresh}
          navToEditQuote={navToEditQuote}
        />
      </View>
    );
  }

  _handleRefresh = () => {
    this.props.navigation.state.params.refresh().then(quotes => {
      this.setState({ quotes });
    });
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35
  }
});
