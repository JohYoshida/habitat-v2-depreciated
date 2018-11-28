import React from "react";
import { createSwitchNavigator } from "react-navigation";

import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

// You could add another route here for authentication.
// Read more at https://reactnavigation.org/docs/en/auth-flow.html
export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthNavigator,
    App: MainTabNavigator
  },
  {
    initialRouteName: "AuthLoading"
  }
);
