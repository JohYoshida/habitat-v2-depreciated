import React, { Component } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import HabitListItem from "./HabitListItem";
import LoadingPanel from "./LoadingPanel";

class HabitsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.isLoading) {
      return <LoadingPanel />
    } else {
      return (
        <FlatList
          data={this.props.habits}
          renderItem={this._renderItem}
          ListEmptyComponent={this._renderEmpty}
          keyExtractor={this._keyExtractor}
        />
      );
    }
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <HabitListItem
      key={item.id}
      habit={item}
      onPress={this.props.onPress}
      onLongPress={this.props.onLongPress}
    />
  )

  _renderEmpty = () => {
    return (
      <View style={styles.container}>
        <Text>Habits you add will appear here.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
  }
});

export default HabitsList;
