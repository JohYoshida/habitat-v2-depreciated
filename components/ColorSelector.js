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

    return <View style={styles.container}>{row}</View>;
  }

  _onPress(color) {
    this.setState({ color });
    this.props.pickColor(color);
  }
}

const styles = StyleSheet.create({
  container: {
    height: 25,
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 30
  },
  selected: {
    flex: 8,
    borderWidth: 1,
    borderRadius: 100,
    margin: 3
  },
  unselected: {
    flex: 8,
    borderRadius: 100,
    margin: 4
  },
  button: {
    alignSelf: "center",
    height: 25,
    width: 25,
    borderRadius: 100,
    margin: 2
  },
  red: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["redPrimary"]
  },
  orange: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["orangePrimary"]
  },
  yellow: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["yellowPrimary"]
  },
  lime: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["limePrimary"]
  },
  green: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["greenPrimary"]
  },
  blue: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["bluePrimary"]
  },
  purple: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["purplePrimary"]
  },
  indigo: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: Colors["indigoPrimary"]
  }
});

export default ColorPicker;
