import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ExportScreen from "../screens/ExportScreen";
import { colors } from "../colors";

// ============================================
import TraverseActionScreen from "../screens/TraverseActionScreen";
import AdjustmentResultsScreen from "../screens/AdjustmentResultsScreen";
import OpenTraverseScreen from "../screens/OpenTraverseScreen";
import CloseTraverseScreen from "../screens/CloseTraverseScreen";
import TraverseEntryScreen from "../screens/TraverseEntryScreen";
import NextOpenTraverseScreen from "../screens/NextOpenTraverseScreen";
import TraverseTableScreen from "../screens/TraverseTableScreen";
import TempTraverseScreen from "../screens/TempTraverseScreen";
// ============================================
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="refStation"
        component={CloseTraverseScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="TraverseEntry"
        component={TraverseEntryScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TraverseAction"
        component={TraverseActionScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TraverseTable"
        component={TraverseTableScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AdjustmentResult"
        component={AdjustmentResultsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OpenTraverse"
        component={OpenTraverseScreen}
      />
    </Stack.Navigator>
  );
};
const Tab = createBottomTabNavigator();
const Buttomtab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // tabBarActiveTintColor: "tomato",
        // tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.primaryColor,
          height: 70,
        },
      })}
    >
      <Tab.Screen
        name="Data"
        component={AppStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
              }}
            >
              <MaterialCommunityIcons
                name="abacus"
                size={25}
                color={focused ? "red" : "white"}
              />
              <Text style={{ color: focused ? "red" : "white", fontSize: 15 }}>
                Data
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Export"
        component={ExportScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
              }}
            >
              <MaterialCommunityIcons
                name="download"
                size={25}
                color={focused ? "red" : "white"}
              />
              <Text style={{ color: focused ? "red" : "white", fontSize: 15 }}>
                Export
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Buttomtab;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
  },
});
