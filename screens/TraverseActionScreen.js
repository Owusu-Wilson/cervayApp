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
  bearing,
  toDegrees,
  toRadians,
  getAdjustedBearings,
  getCoordinates,
  getUnadjustedBearings,
} from "../api/functions";

export default function TraverseActionScreen({ route, navigation }) {
  const { computations } = route.params;

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

  let stations = [];

  route.params.tableData.forEach((element) => {
    stations.push(element.traverseStation);
  });

  function handleContinue() {
    Alert.alert(
      "Select Traverse Type",
      "What type of traverse (Open or Close)",
      [
        {
          text: "Open Traverse",
          onPress: () => {
            console.log("Open traverse Pressed");
            navigation.navigate("OpenTraverse");
          },
        },
        {
          text: "Close Traverse",
          onPress: () => {
            console.log("Close traverse pressed");
            navigation.navigate("CloseTraverse");
          },
        },
      ]
    );
  }

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
  // const onShare = async () => {
  //   // console.log(data);
  //   // var appDir = FileSystem.documentDirectory;
  //   // const fileUri = `${appDir}${"myimg.jpg"}`;
  //   // const uri = "https://unsplash.com/photos/ZkrxPVoYoCw";
  //   // const downloadedFile = await FileSystem.downloadAsync(uri, fileUri);

  //   // if (downloadedFile.status != 200) {
  //   //   console.log("error");
  //   // }

  //   try {
  //     const result = await Share.share({
  //       message:
  //         "React Native | A framework for building native apps using React",
  //       title: "Export",
  //       url: "*.txt",
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  const generateExcel = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet([
      ["Odd", "Even", "Total"],
      [1, 2, { t: "n", v: 3, f: "A2+B2" }],
      [3, 4, { t: "n", v: 7, f: "A3+B3" }],
      [5, 6, { t: "n", v: 10, f: "A4+B4" }],
    ]);

    XLSX.utils.book_append_sheet(wb, ws, "MyFirstSheet", true);

    let ws2 = XLSX.utils.aoa_to_sheet([
      ["Odd*2", "Even*2", "Total"],
      [
        { t: "n", f: "MyFirstSheet!A2*2" },
        { t: "n", f: "MyFirstSheet!B2*2" },
        { t: "n", f: "A2+B2" },
      ],
      [
        { t: "n", f: "MyFirstSheet!A3*2" },
        { t: "n", f: "MyFirstSheet!B3*2" },
        { t: "n", f: "A3+B3" },
      ],
      [
        { t: "n", f: "MyFirstSheet!A4*2" },
        { t: "n", f: "MyFirstSheet!B4*2" },
        { t: "n", f: "A4+B4" },
      ],
    ]);

    XLSX.utils.book_append_sheet(wb, ws2, "MySecondSheet", true);

    const base64 = XLSX.write(wb, { type: "base64" });
    const filename = FileSystem.documentDirectory + "MyExcel.xlsx";
    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      Sharing.shareAsync(filename);
    });
  };
  /**
   * data to be used for computations. Received from the previous route.
   * @type Object
   */
  const rawData = route.params.tableData;
  const instrumentStation_angle = route.params.bearings.instrument_station;
  const referenceStation_angle = route.params.bearings.reference_station;

  const x = instrumentStation_angle.x - referenceStation_angle.x;
  const y = instrumentStation_angle.y - referenceStation_angle.y;

  const x2 = referenceStation_angle.x - instrumentStation_angle.x;
  const y2 = referenceStation_angle.y - instrumentStation_angle.y;
  let alpha = Pol(x, y);
  let beta = Pol(x2, y2);
  let num_traverses = rawData.length;
  let included_angles = [];
  let distances = [];
  let unadjusted_bearings = [];
  let adjusted_bearings = [];
  let coordinates = [];
  for (let index = 0; index < rawData.length; index++) {
    const element = rawData[index];
    distances.push(element.distance);
    let L =
      dms_to_degrees(element.bearings.LL2) -
      dms_to_degrees(element.bearings.LL1);
    let R =
      dms_to_degrees(element.bearings.RR2) -
      dms_to_degrees(element.bearings.RR1);

    // Applying conditions to the differences to calculate the included angle
    if (L < 0) {
      L += 360;
    }
    if (R < 0) {
      R += 360;
    }
    // Appending the included angle to its array
    included_angles.push((L + R) / 2);
  }
  // unadjusted_bearings = getUnadjustedBearings(included_angles, alpha.theta);
  // adjusted_bearings = getAdjustedBearings(
  //   alpha.theta,
  //   beta.theta,
  //   num_traverses,
  //   unadjusted_bearings
  // );
  // coordinates = getCoordinates(adjusted_bearings, )

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
          console.log(num_traverses);
          console.log(alpha);
          navigation.navigate("TraverseTable", {
            itemId: 86,
            tableData: route.params.tableData,
            otherParam: "anything you want here",
          });
        }}
      />
      <LargeButton
        width="90%"
        type="f"
        iconName="file-download"
        primaryText="Export Traverse Data"
        secondaryText="Start an open traverse survey"
        onPress={generateExcel}
      />
      <LargeButton
        width="90%"
        type="f"
        iconName="calculator"
        primaryText="Compute Coordinates"
        secondaryText="Finish the adjustment computations"
        onPress={() => {
          // console.log(distances);
          // console.log(stations);
          // console.log(route.params);
          console.log("LOGS FROM ACTION SCREEN");
          console.log(`Computations`);
          console.log(computations);
          navigation.navigate("Coordinates", {
            itemId: 87,
            tableData: route.params.tableData,
            coordinates: route.params.coordinates,
            bearings: route.params.bearings,
            computations: computations,
            otherParam: "anything you want here",
          });
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
