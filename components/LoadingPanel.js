import React, { Component } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

class LoadingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingAnim: new Animated.Value(0),
      colorAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.parallel([
        Animated.timing(this.state.loadingAnim, {
          toValue: 1,
          duration: 2000
        }),
        Animated.timing(this.state.colorAnim, {
          toValue: 1,
          duration: 2000
        })
      ])
    ).start();
  }

  render() {
    const { loadingAnim, colorAnim } = this.state;
    return (
      <View style={styles.margin} >
        <Animated.View
          style={{
            transform: [
              {
                rotate: loadingAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"]
                })
              }
            ]
          }}
        >
          <View style={styles.container}>
            <Animated.View
              style={{
                backgroundColor: colorAnim.interpolate({
                  inputRange: [0, 0.33, 0.66, 1],
                  outputRange: ["#f44336", "#FFEB3B", "#2196F3", "#f44336"]
                }),
                borderRadius: 100
              }}
            >
              <View style={styles.ball} />
            </Animated.View>
            <View style={styles.spacer} />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 100,
    height: 150
  },
  margin: {
    margin: 20,
  },
  spacer: {
    height: 100
  },
  ball: {
    height: 25,
    width: 25,
    borderRadius: 100
  }
});

export default LoadingPanel;
