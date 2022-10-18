import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./screens/HomeScreen";
import PreviousTraverseScreen from "./screens/PreviousTraverseScreen";
import { init_db } from "./db";

import Buttomtab from "./navigation/tabs";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonts
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);
  const [dataPresent, setDataPresent] = useState(false);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user_details");
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };
  const loadData = () => {
    AsyncStorage.getAllKeys().then((data) => {
      if (data !== null) {
        setDataPresent(false);
      }
    });
  };
  useEffect(() => {
    init_db();
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          SSLight: require("./assets/fonts/SourceSansPro/SourceSansProLight.ttf"),
          SSRegular: require("./assets/fonts/SourceSansPro/SourceSansProRegular.ttf"),
          SSBold: require("./assets/fonts/SourceSansPro/SourceSansProBold.ttf"),
        }).then(() => {
          console.log(getData());
        });
        // Initializing the database file i.e creating it if it doesnt exist

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  // setting a condition to render the app only after fonts are successfully loaded

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="LandingScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PreviousTraverse"
          component={PreviousTraverseScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeStack"
          component={Buttomtab}
        />
        {/* <Stack.Screen
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
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
