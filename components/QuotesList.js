import React, { Component } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import QuotesListItem from "./QuotesListItem";
import LoadingPanel from "./LoadingPanel";

class QuotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false
    };
  }

  render() {
    if (this.props.isLoading) {
      return <LoadingPanel />;
    } else {
      return (
        <FlatList
          data={this.props.quotes}
          renderItem={this._renderItem}
          ListEmptyComponent={this._renderEmpty}
          ItemSeparatorComponent={this._renderSeparator}
          keyExtractor={this._keyExtractor}
          onRefresh={this._handleRefresh.bind(this)}
          refreshing={this.state.isRefreshing}
        />
      );
    }
  }

  _handleRefresh() {
    this.setState({ isRefreshing: true }, () => {
      this.props.onRefresh();
      this.setState({ isRefreshing: false });
    });
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => <QuotesListItem key={item.id} quote={item} />;

  _renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  _renderEmpty = () => {
    return (
      <View style={styles.container}>
        <Text>Quotes you add will appear here.</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center"
  },
  separator: {
    height: 5
  }
});

export default QuotesList;
