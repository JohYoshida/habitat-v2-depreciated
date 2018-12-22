import React, { Component } from "react";
import { Platform, TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: ""
    };
  }

  componentDidMount() {
    const { color } = this.props;
    if (color) {
      this.setState({ color });
    }
  }

  render() {
    const colors = [
      "tomato",
      "tangerine",
      "banana",
      "basil",
      "sage",
      "peacock",
      "blueberry",
      "lavender",
      "grape",
      "flamingo",
      "graphite",
      "default",
    ];
    const row = [];
    colors.forEach(color => {
      if (this.state.color === color) {
        row.push(
          <TouchableOpacity
            key={color}
            style={styles.selected}
            onPress={this._onPress.bind(this, color)}
          >
            <View style={styles.button}>
              <View style={styles[color]} />
            </View>
          </TouchableOpacity>
        );
      } else {
        row.push(
          <TouchableOpacity
            key={color}
            style={styles.unselected}
            onPress={this._onPress.bind(this, color)}
          >
            <View style={styles.button}>
              <View style={styles[color]} />
            </View>
          </TouchableOpacity>
        );
      }
    });

    let top = row.slice(0, 6);
    let bottom = row.slice(6);

    return (
      <View style={styles.container}>
        <View style={styles.row}>{top}</View>
        <View style={styles.row}>{bottom}</View>
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
    marginVertical: 30
  },
  row: {
    height: 25,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  selected: {
    flex: 6,
    borderWidth: 1,
    borderRadius: 100,
    margin: 3
  },
  unselected: {
    flex: 6,
    borderRadius: 100,
    margin: 4
  },
  button: {
    alignSelf: "center",
    height: 38,
    width: 38,
    borderRadius: 100,
    margin: 2,
    elevation: 5,
  },
  tomato: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["tomato_Primary"]
  },
  tangerine: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["tangerine_Primary"]
  },
  banana: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["banana_Primary"]
  },
  basil: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["basil_Primary"]
  },
  sage: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["sage_Primary"]
  },
  peacock: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["peacock_Primary"]
  },
  blueberry: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["blueberry_Primary"]
  },
  lavender: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["lavender_Primary"]
  },
  grape: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["grape_Primary"]
  },
  flamingo: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["flamingo_Primary"]
  },
  graphite: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["graphite_Primary"]
  },
  default: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["default_Primary"]
  },
});

export default ColorPicker;
