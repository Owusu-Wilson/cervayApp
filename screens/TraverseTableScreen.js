import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function TraverseTableScreen() {
  return (
    <View>
      <View style={styles.tableContainer}>
        <View style={styles.topIcon}>
          <TouchableOpacity>
            <Ionicons name="cloud-download-sharp" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>From</DataTable.Title>
            <DataTable.Title>To</DataTable.Title>
            <DataTable.Title numeric>Angle</DataTable.Title>
            <DataTable.Title numeric>Distance</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>John</DataTable.Cell>
            <DataTable.Cell>john@kindacode.com</DataTable.Cell>
            <DataTable.Cell numeric>33</DataTable.Cell>
            <DataTable.Cell numeric>33</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Bob</DataTable.Cell>
            <DataTable.Cell>test@test.com</DataTable.Cell>
            <DataTable.Cell numeric>105</DataTable.Cell>
            <DataTable.Cell numeric>105</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Mei</DataTable.Cell>
            <DataTable.Cell>mei@kindacode.com</DataTable.Cell>
            <DataTable.Cell numeric>23</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Mei</DataTable.Cell>
            <DataTable.Cell>mei@kindacode.com</DataTable.Cell>
            <DataTable.Cell numeric>23</DataTable.Cell>
            <DataTable.Cell numeric>23</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    // paddingTop: 50,
    paddingHorizontal: 20,
  },
  topIcon: {
    padding: 10,
    alignSelf: "flex-end",
  },
});
