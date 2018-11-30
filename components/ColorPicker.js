import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ""
    };
  }

  render() {
    const colors = [
      "red",
      "orange",
      "yellow",
      "lime",
      "green",
      "blue",
      "purple",
      "indigo"
    ];
    const row = [];
    colors.forEach(color => {
      if (color === this.state.color) {
        row.push(
          <TouchableOpacity
            key={color}
            style={styles.touchContainer}
            onPress={this._onPress.bind(this, color)}
          >
            <View style={styles[color]} />
          </TouchableOpacity>
        );
      } else {
        row.push(
          <TouchableOpacity
            key={color}
            onPress={this._onPress.bind(this, color)}
          >
            <View style={styles[color]} />
          </TouchableOpacity>
        );
      }
    });
    const top = row.splice(0, 4);
    const bottom = row.splice(4, row.length);
    return (
      <View style={styles.container}>
        <View style={styles.row}>{top}</View>
        <View style={styles.row}>{row}</View>
      </View>
    );
  }

  _onPress(color) {
    this.setState({ color });
    this.props.pickColor(color);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  touchContainer: {
    borderWidth: 1,
    borderRadius: 100,
    height: 56
  },
  red: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#f44336"
  },
  orange: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#FF9800"
  },
  yellow: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#FFEB3B"
  },
  lime: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#CDDC39"
  },
  green: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#4CAF50"
  },
  blue: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#2196F3"
  },
  purple: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#9C27B0"
  },
  indigo: {
    height: 50,
    width: 50,
    borderRadius: 100,
    margin: 2,
    backgroundColor: "#3F51B5"
  }
});

export default ColorPicker;
