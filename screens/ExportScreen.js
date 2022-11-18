import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import LargeButton from "../components/LargeButton";
import { colors } from "../colors";
import { generateExcel } from "../api/handleExport";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ExportScreen = () => {
  const [user_details, setUserDetails] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [toStations, setToStations] = useState([]);
  const [traverses, setTraverses] = useState([{}]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user_info");
      const traverses_from_async = await AsyncStorage.getItem("traverse_data");
      if (value !== undefined) {
        // value previously stored
        setUserDetails(JSON.parse(value));
      }
      if (traverses_from_async != undefined) {
        setTraverses(traverses_from_async);
      }
    } catch (e) {
      // error reading value
    }
  };
  const getCoordinates = async () => {
    try {
      const value = await AsyncStorage.getItem("coordinates");
      if (value !== null) {
        // value previously stored
        setCoordinates(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };
  const getStations = async () => {
    try {
      const value = await AsyncStorage.getItem("to_stations");
      if (value !== null) {
        // value previously stored
        setToStations(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
    //  getCoordinates()
    getStations();
  });

  let coordinates_x = [];
  let coordinates_y = [];

  coordinates.forEach((element) => {
    coordinates_x.push(element.x);
    coordinates_y.push(element.y);
  });

  var structuredData = []; //a 2D array

  for (let index = 0; index < toStations.length; index++) {
    structuredData.push([
      toStations[index],
      coordinates_x[index],
      coordinates_y[index],
    ]);
  }
  const data = [
    ["Odd", "Even", "Total"],
    [1, 2, { t: "n", v: 3, f: "A2+B2" }],
    [3, 4, { t: "n", v: 7, f: "A3+B3" }],
    [5, 6, { t: "n", v: 10, f: "A4+B4" }],
  ];
  return (
    <View style={styles.container}>
      <LargeButton
        type="m"
        primaryText="Export Adjustments"
        secondaryText="Get only adjustment results"
        iconName="file"
        width="80%"
        onPress={() => {
          // alert("clicked")
          generateExcel(structuredData);
        }}
      />
    </View>
  );
};

export default ExportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#202020",
  },
  head: {
    color: colors.secondaryColor,
    fontFamily: "SSBold",
    fontWeight: "700",
    fontSize: 40,
    alignSelf: "flex-start",
    // paddingLeft: 20,
    marginBottom: 10,
  },
});
