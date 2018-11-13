import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.touchContainer}
            onPress={this._onPress.bind(this, "red")}
          >
            <View style={styles.red}></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchContainer}
            onPress={this._onPress.bind(this, "orange")}
          >
            <View style={styles.orange}></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchContainer}
            onPress={this._onPress.bind(this, "yellow")}
          >
            <View style={styles.yellow}></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchContainer}
            onPress={this._onPress.bind(this, "lime")}
          >
            <View style={styles.lime}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.touchContainer}
            onPress={this._onPress.bind(this, "green")}
          >
            <View style={styles.green}></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchContainer}
            onPress={this._onPress.bind(this, "blue")}
          >
            <View style={styles.blue}></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchContainer}
            onPress={this._onPress.bind(this, "purple")}
          >
            <View style={styles.purple}></View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchContainer}
            onPress={this._onPress.bind(this, "indigo")}
          >
            <View style={styles.indigo}></View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _onPress(color) {
    this.setState({ color });
    console.log(color);
    this.props.pickColor(color);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  touchContainer: {
  },
  red: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#f44336",
  },
  orange: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#FF9800",
  },
  yellow: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#FFEB3B",
  },
  lime: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#CDDC39",
  },
  green: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#4CAF50",
  },
  blue: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#2196F3",
  },
  purple: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#9C27B0",
  },
  indigo: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#3F51B5",
  },
});

export default ColorPicker;
