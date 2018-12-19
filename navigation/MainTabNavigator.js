import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

import HabitsScreen from "../screens/HabitsScreen";
import CalendarScreen from "../screens/CalendarScreen";

import QuotesScreen from "../screens/QuotesScreen";
import ViewQuotesScreen from "../screens/ViewQuotesScreen";
import AddQuoteScreen from "../screens/AddQuoteScreen";
import EditQuoteScreen from "../screens/EditQuoteScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-link${focused ? "" : "-outline"}`
          : "md-link"
      }
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-options${focused ? "" : "-outline"}`
          : "md-options"
      }
    />
  )
};

const HabitsStack = createStackNavigator({
  Habits: HabitsScreen,
  Calendar: CalendarScreen
});

HabitsStack.navigationOptions = {
  tabBarLabel: "Habits",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-calendar${focused ? "" : "-outline"}`
          : "md-calendar"
      }
    />
  )
};

const QuotesStack = createStackNavigator({
  Quotes: QuotesScreen,
  ViewQuotes: ViewQuotesScreen,
  AddQuote: AddQuoteScreen,
  EditQuote: EditQuoteScreen,
});

QuotesStack.navigationOptions = {
  tabBarLabel: "Quotes",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios" ? `ios-egg${focused ? "" : "-outline"}` : "md-egg"
      }
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  // LinksStack,
  // SettingsStack,
  HabitsStack,
  QuotesStack
});
