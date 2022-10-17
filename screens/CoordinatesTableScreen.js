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
import { formatBearing } from "../api/functions";
export default function CoordinatesTableScreen({ route, navigation }) {
  const { tableData, computations } = route.params;
  const tData = [
    ["1", "2", "3"],
    ["a", "b", "c"],
    ["1", "2", "3"],
    ["a", "b", "c"],
  ];
  const tableHead = ["To", "Coordinate X", "Coordinate Y"];

  const bearings = [];
  // var stations = [];
  const distance = [];
  var fromStations = [];
  var coordinates = [];
  var toStations = [];
  /**
   * This data array helps  put all the necessary data to be outputted in the right form.
   */
  var structuredData = []; //a 2D array
  const includedAngles = [];

  tableData.forEach((element) => {
    bearings.push(element.bearings);
    distance.push(element.distance);
    fromStations.push(element.desc_1);
    toStations.push(element.desc_2);
    includedAngles.push(element.mean);
    coordinates.push(element.distance); //change this to coordinates
  });
  // structuredData = toStations.map((elem) => {
  //   var i = fromStations.indexOf(elem);
  //   return [elem, coordinates[i].x, coordinates[i].y];
  // });
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Final Coordinates</Text>
      <Text style={styles.topText}>{computations}</Text>
      <View style={styles.tableContainer}>
        <Table borderStyle={styles.table}>
          <Row data={tableHead} style={styles.head} textStyle={styles.head} />

          {/* <Rows data={structuredData} textStyle={styles.text} /> */}
        </Table>
      </View>
      {/* <CustomButton
        color={colors.primaryColor}
        text={"Done"}
        width={370}
        onclick={() => {
          // console.log(stations.length, fromStations, toStations);
        }}
      />
      <FloatingAction
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
    marginBottom: 30,

    padding: 5,
  },
  table: { borderWidth: 2, borderColor: colors.primaryColor },
});
