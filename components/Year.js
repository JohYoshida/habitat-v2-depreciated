import React from "react";
import { AsyncStorage, ScrollView, StyleSheet, Text, TouchableOpacity,  View } from "react-native";

const moment = require("moment");
const { URL } = require("../constants");

class Year extends React.Component {
  static navigationOptions = {
    // header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      userToken: "",
      authString: "",
      year: moment().year(),
      data: {}
    };
  }

  componentDidMount() {
    const { habitID } = this.props;
    this._getAsyncKeys().then(res => {
      const { userToken, authString } = res;
      let { year, data } = this.state;
      // Get days associated with habit calendar
      fetch(`${URL}/users/${userToken}/habits/${habitID}/${year}`)
        .then(res => res.json())
        .then(json => {
          json.forEach(row => {
            data[`${row.month}-${row.day}`] = row.value;
          });
          this.setState({ data, userToken, authString });
        })
        .catch(err => console.log("Error!", err));
    });
  }

  render() {
    return (
    );
  }

  _getAsyncKeys = async () => {
    let data = {}
    try {
      await AsyncStorage.multiGet(["userToken", "authString"]).then(res => {
        data =  { userToken: res[0][1], authString: res[1][1] };
      });
    } catch (err) {
      console.log("Error!", err);
    }
    return data;
  };
const styles = StyleSheet.create({
});

export default Year;
