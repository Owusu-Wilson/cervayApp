import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import { DataTable, Snackbar, Card } from "react-native-paper";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  Cell,
  CellProps,
  Col,
  ColProps,
  Cols,
  ColsProps,
  Row,
  RowProps,
  Rows,
  RowsProps,
  Table,
  TableProps,
  TableWrapper,
  TableWrapperProps,
} from "react-native-table-component";
import ActionButton from "../components/ActionButton";
import { CustomButton } from "../components/CustomButton";
import { FloatingAction } from "react-native-floating-action";

import { colors } from "../colors";
import { degrees_to_dms } from "../api/computations";
import { formatBearing, sum } from "../api/functions";

export default function CoordinatesTableScreen({ route, navigation }) {
  const {
    from_stations,
    to_stations,
    bearings,
    tableData,
    coordinates,
    unadjusted_bearings,
    adjusted_bearings,
    included_angles,
  } = route.params;

  let coordinates_x = [];
  let coordinates_y = [];

  coordinates.forEach((element) => {
    coordinates_x.push(element.x);
    coordinates_y.push(element.y);
  });
  const tData = [
    ["1", "2", "3"],
    ["a", "b", "c"],
    ["1", "2", "3"],
    ["a", "b", "c"],
  ];
  const tableHead = ["To", "Coordinate X", "Coordinate Y"];

  /**
   * This data array helps  put all the necessary data to be outputted in the right form.
   */
  var structuredData = []; //a 2D array

  for (let index = 0; index < to_stations.length; index++) {
    structuredData.push([
      to_stations[index],
      coordinates_x[index],
      coordinates_y[index],
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Final Coordinates</Text>
      <Text style={styles.value}>Instrument Station:</Text>
      <Text style={styles.value}>X: {bearings.instrument_station.x}</Text>
      <Text style={styles.value}>Y: {bearings.instrument_station.y}</Text>
      <View style={styles.tableContainer}>
        <Table borderStyle={styles.table}>
          <Row data={tableHead} style={styles.head} textStyle={styles.head} />

          <Rows data={structuredData} textStyle={styles.text} />
        </Table>
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          color={colors.primaryColor}
          text={"Done"}
          width={370}
          onclick={() => {
            console.log("COORDINATES");
            console.log("================================");
            console.log([coordinates_x, coordinates_y]);
            console.log("STATIONS");
            console.log(to_stations);
            // console.log(computations.coordinates.coordinates);
          }}
        />
      </View>
      {/*<FloatingAction
        color={colors.primaryColor}
        overlayColor="rgba(240, 255, 255, 0.02)"
        floatingIcon={<AntDesign name="back" size={24} color="white" />}
        onPressMain={() => {
          navigation.goBack();
        }}
        onPressItem={(name) => {
          navigation.navigate(name);
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30,
    justifyContent: "flex-start",
  },
  tableContainer: {
    // paddingTop: 50,
    // paddingHorizontal: 20,
  },
  topIcon: {
    padding: 10,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  btn: {
    paddingTop: 100,
  },
  text: {
    fontSize: 15,
    // borderColor: colors.primaryColor,
    // borderWidth: 2,
    padding: 5,
  },
  head: {
    fontSize: 20,
    fontFamily: "SSBold",
    fontWeight: "700",
    backgroundColor: colors.primaryColor,
    color: "white",
    borderColor: "white",
    padding: 5,
    borderWidth: 0.5,
    // borderColor: colors.secondaryColor,
  },
  topText: {
    fontSize: 30,
    fontFamily: "SSBold",
    fontWeight: "700",
    color: colors.primaryColor,
    marginBottom: 20,

    padding: 5,
  },
  value: {
    fontSize: 20,
    fontFamily: "SSRegular",
    color: colors.hue,

    padding: 5,
  },
  table: { borderWidth: 2, borderColor: colors.primaryColor },
  btnContainer: {
    // backgroundColor: "yellow",
    flex: 1 / 5,
    marginHorizontal: 20,
    top: "40%",
  },
});
