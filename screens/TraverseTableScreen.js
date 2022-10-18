import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Button } from "react-native";
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
import { degrees_to_dms, toRadians } from "../api/computations";
import { formatBearing, toDegrees } from "../api/functions";
export default function TraverseTableScreen({ route, navigation }) {
  const { itemId, tableData, computations } = route.params;
  const tableHead = ["From", "To", "Angle", "Distance"];

  useEffect(() => {
    console.log(computations);
  });
  const bearings = [];
  var stations = [];
  const distance = [];
  var fromStations = [];
  let ll1 = [];

  var toStations = [];
  /**
   * This data array helps  put all the necessary data to be outputted in the right form.
   */
  var structuredData = []; //a 2D array
  const includedAngles = [];
  const includedAngles2 = [];

  // computations.forEach((element) => {
  //   includedAngles2.push(element.included_angles);
  // });
  tableData.forEach((element) => {
    stations.push(element.traverseStation);
    bearings.push(element.bearings);
    distance.push(element.distance);
    ll1.push(element.bearings.LL1);
    // fromStations.push(element.desc_1);
    // toStations.push(element.desc_2);
    includedAngles.push(toRadians(element.mean));
  });
  // stations.pop();
  // Seperating the stations into FROM and TO
  // toStations = stations.filter((elem) => {
  //   if (stations.indexOf(elem) % 2 != 0) {
  //     return elem;
  //   }
  // });
  // fromStations = stations.filter((elem) => {
  //   if (stations.indexOf(elem) % 2 == 0) {
  //     return elem;
  //   }
  // });
  for (let index = 0; index < stations.length; index++) {
    // const element = stations[index];
    fromStations.push(stations[index]);
    toStations.push(stations[index + 1]);
  }

  // ADDING THE FIRST  STATION TO THE TO_STATIONS SINCE IT IS A CLOSED TRAVERSE
  toStations.push(stations[0]);
  //  0, 1, 2,  3, 4....
  structuredData = fromStations.map((elem) => {
    var i = fromStations.indexOf(elem);
    return [elem, toStations[i], includedAngles[i], distance[i]];
  });
  // for (let index = 0; index < stations.length; index++) {
  //   fromStations.push(stations[index]);
  //   toStations.push(stations[index + 1]);
  //   // if (stations[index + 1]) toStations.push(stations[index + 1]);
  // }
  var heights = fromStations.map((elem) => {
    return 30;
  });

  // const tableData = data;

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <Table borderStyle={styles.table}>
          <Row data={tableHead} style={styles.head} textStyle={styles.head} />

          <Rows data={structuredData} textStyle={styles.text} />
        </Table>
      </View>
      {/* <CustomButton
        color={colors.primaryColor}
        text={"Done"}
        width={370}
        onclick={() => {
          // console.log(stations.length, fromStations, toStations);
        }}
      /> */}
      {/* <FloatingAction
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
    paddingTop: 30,
    justifyContent: "flex-start",
  },
  tableContainer: {
    // paddingTop: 50,
    paddingHorizontal: 20,
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
  },
  table: { borderWidth: 2, borderColor: colors.primaryColor },
});
