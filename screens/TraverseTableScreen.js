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
// import { degrees_to_dms, toRadians } from "../api/computations";
import {
  formatBearing,
  toDegrees,
  toRadians,
  degrees_to_dms,
} from "../api/functions";
export default function TraverseTableScreen({ route, navigation }) {
  const {
    from_stations,
    to_stations,
    bearings,
    tableData,
    coordinates,
    unadjusted_bearings,
    adjusted_bearings,
    included_angles,
    distances,
  } = route.params;
  const tableHead = ["From", "To", "Angle", "Distance"];

  useEffect(() => {
    console.log(from_stations);
    console.log(to_stations)
  });

  /**
   *
   * @param {Array<String>} dms_array
   */
  function formatDMS(dms_array) {
    var str = `${dms_array[0]}°${dms_array[1]}’${dms_array[2]}”`;
    return str;
  }
  /**
   * This data array helps  put all the necessary data to be outputted in the right form.
   */
  var structuredData = []; //a 2D array

  for (let index = 0; index < from_stations.length; index++) {
    structuredData.push([
      from_stations[index],
      to_stations[index],
      formatDMS(degrees_to_dms(included_angles[index])),
      distances[index],
    ]);
  }

  // =============================
  var heights = from_stations.map((elem) => {
    return 30;
  });

  // const tableData = data;

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <Table borderStyle={styles.table}>
          <Row data={tableHead} style={styles.head} textStyle={styles.head} />

          <Rows
            data={structuredData}
            textStyle={styles.text}
            // heightArr={heights}
          />
        </Table>
      </View>
      <CustomButton
        color={colors.primaryColor}
        text={"Done"}
        width={370}
        onclick={() => {
          console.log("From")
          console.log(from_stations)
          console.log("to")
          console.log(to_stations)
          console.log(coordinates)
        }}
        />

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
