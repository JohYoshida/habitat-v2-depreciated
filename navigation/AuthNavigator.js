import React from "react";
import { Platform } from "react-native";
import { createSwitchNavigator } from "react-navigation";

import SignInScreen from "../screens/SignInScreen";
import RegisterScreen from "../screens/RegisterScreen";

export default createSwitchNavigator(
  {
  SignIn: SignInScreen,
  Register: RegisterScreen,
},
{
  initialRouteName: "SignIn"
}
);
