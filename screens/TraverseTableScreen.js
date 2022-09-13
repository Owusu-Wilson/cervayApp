import React from "react";
import { View, StyleSheet, TouchableOpacity, Button } from "react-native";
import { DataTable, Snackbar, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
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
export default function TraverseTableScreen({ route, navigation }) {
  const { itemId, tableData, otherParam } = route.params;
  const tableHead = ["From", "To", "Angle", "Distance"];

  const bearings = [];
  var fromStations = [];
  const toStations = [];
  tableData.forEach((element) => {
    bearings.push(element.bearings);
    fromStations.push(element.traverseStation);
    toStations.push(element.traverseStation);
  });
  fromStations.pop();
  // const tableData = data;
  const tData = [
    ["1", "2", "3", "4"],
    ["a", "b", "c", "d"],
    ["1", "2", "3", "456\n789"],
    ["a", "b", "c", "d"],
  ];
  const tableTitle = ["Title", "Title2", "Title3", "Title4"];

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Col
            data={fromStations}
            style={styles.title}
            heightArr={[30, 30, 30, 30, 30, 30, 30]}
            textStyle={styles.text}
          />
          {/* <Col
            data={tableTitle}
            style={styles.title}
            heightArr={[28, 28]}
            textStyle={styles.text}
          /> */}
          {/* <Rows data={[stations]} textStyle={styles.text} /> */}
        </Table>
      </View>
      {/* <Button
        style={styles.btn}
        title="Data"
        onPress={() => {
          tableData.forEach((element) => {
            console.log(bearings);
          });
          console.log("Done");
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
});
