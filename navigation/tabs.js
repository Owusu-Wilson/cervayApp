import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome,
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
import InfoFormScreen from "../screens/InfoFormScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CoordinatesTableScreen from "../screens/CoordinatesTableScreen";
// ============================================
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="form"
        component={InfoFormScreen}
      />
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
        name="Coordinates"
        component={CoordinatesTableScreen}
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
          backgroundColor: "white",
          height: 70,
          shadowColor: "black",
          shadowOpacity: 0.25,
          shadowOffset: 1.25,
        },
      })}
    >
      <Tab.Screen
        name="Data"
        component={AppStack}
        options={{
          header: ({ focused }) => (
            <View style={{}}>
              <Text
                style={{
                  // alignContent: "center",
                  textAlign: "center",
                  alignSelf: "center",
                  width: "50%",
                  backgroundColor: colors.primaryColor,
                  marginTop: 30,
                  borderRadius: 15,
                  padding: 5,
                  color: "white",
                  fontSize: 25,
                  fontWeight: "bold",
                  fontFamily: "SSBold",
                }}
              >
                ∙ Details ∙
              </Text>
            </View>
          ),
          headerShown: false,
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
                name={focused ? "database-edit-outline" : "database-edit"}
                size={25}
                color={focused ? colors.primaryColor : "#888888"}
              />
              <Text
                style={{
                  color: focused ? colors.primaryColor : "#888888",
                  fontSize: 15,
                }}
              >
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
                name={focused ? "download-outline" : "download"}
                size={25}
                color={focused ? colors.primaryColor : "#888888"}
              />
              <Text
                style={{
                  color: focused ? colors.primaryColor : "#888888",
                  fontSize: 15,
                }}
              >
                Export
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ProfileScreen}
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
              <Ionicons
                name={focused ? "md-clipboard-outline" : "md-clipboard"}
                size={25}
                color={focused ? colors.primaryColor : "#888888"}
              />
              <Text
                style={{
                  color: focused ? colors.primaryColor : "#888888",
                  fontSize: 15,
                }}
              >
                Report
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
