import {
  StyleSheet,
  Text,
  View,
  Share,
  Alert,
  PermissionsAndroid,
} from "react-native";
import React from "react";
import { colors } from "../colors";
import { Card } from "../components/Card";
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from "@expo/vector-icons";
import LargeButton from "../components/LargeButton";
import { generateExcel } from "../api/handleExport";

import { StatusBar } from "expo-status-bar";

// expo add expo-file-system expo-sharing xlsx
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import {
  Pol,
  formatBearing,
  degrees_to_dms,
  dms_to_degrees,
  toDegrees,
  toRadians,
  getAdjustedBearings,
  getCoordinates,
  getUnadjustedBearings,
} from "../api/functions";

export default function TraverseActionScreen({ route, navigation }) {
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
  let coordinates_x = [];
  let coordinates_y = [];

  coordinates.forEach((element) => {
    coordinates_x.push(element.x);
    coordinates_y.push(element.y);
  });
  var structuredData = []; //a 2D array
structuredData[0]  = ["To Stations", "Coordinates X","Coordinates Y"]
  for (let index = 0; index < to_stations.length; index++) {
    structuredData.push([
      to_stations[index],
      coordinates_x[index],
      coordinates_y[index],
    ]);
  }
  // const exportDataToExcel = () => {
  //   // Created Sample data
  //   let sample_data_to_export = [
  //     { id: "1", name: "First User" },
  //     { id: "2", name: "Second User" },
  //   ];

  //   let wb = XLSX.utils.book_new();
  //   let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
  //   XLSX.utils.book_append_sheet(wb, ws, "Users");
  //   const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

  //   // Write generated excel to Storage
  //   return RNFS.writeFile(
  //     RNFS.ExternalStorageDirectoryPath + "/my_exported_file.xlsx",
  //     wbout,
  //     "ascii"
  //   )
  //     .then((r) => {
  //       console.log("Success");
  //     })
  //     .catch((e) => {
  //       console.log("Error", e);
  //     });
  // };

  const handleClick = async () => {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (!isPermitedExternalStorage) {
        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage permission needed",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          exportDataToExcel();
          console.log("Permission granted");
        } else {
          // Permission denied
          console.log("Permission denied");
        }
      } else {
        // Already have Permission (calling our exportDataToExcel function)
        alert("Permisions accepted");
      }
    } catch (e) {
      console.log("Error while checking permission");
      console.log(e);
      return;
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.head}>Select an option to Continue</Text>
      {/* include view traverse data */}
      {/* <Card onPress={onShare} icon="download" text="Export Traverse Data" /> */}
      <LargeButton
        width="90%"
        type="mi"
        iconName="table-view"
        primaryText="View Traverse Data"
        secondaryText="Select to view traverse data collected"
        onPress={() => {
          navigation.navigate(
            "TraverseTable",
            /**
             * object sent to the next scren in the route
             */
            {
              bearings: bearings,
              from_stations: from_stations,
              to_stations: to_stations,
              tableData: tableData,
              coordinates: coordinates,
              unadjusted_bearings: unadjusted_bearings,
              adjusted_bearings: adjusted_bearings,
              included_angles: included_angles,
              distances: distances,
            }
          );
        }}
      />
      <LargeButton
        width="90%"
        type="f"
        iconName="calculator"
        primaryText="Compute Coordinates"
        secondaryText="Finish the adjustment computations"
        onPress={() => {
          navigation.navigate(
            "Coordinates",
            /**
             * object sent to the next scren in the route
             */
            {
              bearings: bearings,
              from_stations: from_stations,
              to_stations: to_stations,
              tableData: tableData,
              coordinates: coordinates,
              unadjusted_bearings: unadjusted_bearings,
              adjusted_bearings: adjusted_bearings,
              included_angles: included_angles,
              distances: distances,
            }
            );
          }}
      />
          <LargeButton
            width="90%"
            type="f"
            iconName="file-download"
            primaryText="Export Traverse Data"
            secondaryText="Start an open traverse survey"
            onPress={()=>{
              generateExcel(structuredData)
              // console.log(coordinates)
            }}
          />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
    padding: 20,
  },
  head: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    fontWeight: "700",
    fontSize: 40,
    alignSelf: "flex-start",
    paddingLeft: 20,
    marginBottom: 40,
  },
});
