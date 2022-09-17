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
import * as FileSystem from "expo-file-system";
import LargeButton from "../components/LargeButton";

// import RNFS from "react-native-fs";
import efs from "expo-file-system";
/**
 * Using module xlsx to convert Json object received into an excel file
 */

import XLSX from "xlsx";

export default function TraverseActionScreen({ route, navigation }) {
  const { initial_bearing, closing_bearing } = route.params;

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
  const onShare = async () => {
    // console.log(data);
    // var appDir = FileSystem.documentDirectory;
    // const fileUri = `${appDir}${"myimg.jpg"}`;
    // const uri = "https://unsplash.com/photos/ZkrxPVoYoCw";
    // const downloadedFile = await FileSystem.downloadAsync(uri, fileUri);

    // if (downloadedFile.status != 200) {
    //   console.log("error");
    // }

    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
        title: "Export",
        url: "*.txt",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
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
        onPress={handleClick}
      />
      <LargeButton
        width="90%"
        type="f"
        iconName="calculator"
        primaryText="Continue Computations"
        secondaryText="Finish the adjustment computations"
        onPress={() => {
          console.log(initial_bearing, closing_bearing);
        }}
      />
      {/* <Card
        icon="calculator"
        onPress={handleContinue}
        text="Continue To Adjustments"
      /> */}
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
      />
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
