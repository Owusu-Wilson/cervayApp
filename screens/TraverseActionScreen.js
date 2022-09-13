import { StyleSheet, Text, View, Share, Alert } from "react-native";
import React from "react";
import { colors } from "../colors";
import { Card } from "../components/Card";
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import LargeButton from "../components/LargeButton";

/**
 * Using module xlsx to convert Json object received into an excel file
 */

import * as excel from "xlsx";

export default function TraverseActionScreen({ route, navigation }) {
  // var dataWorkSheet = excel.utils.json_to_sheet(data);
  // // Process Data (add a new row)

  // excel.utils.sheet_add_aoa(
  //   dataWorkSheet,
  //   [["Created " + new Date().toISOString()]],
  //   { origin: -1 }
  // );

  // // Package and Release Data (`writeFile` tries to write and save an XLSB file)
  // excel.writeFile(dataWorkSheet, "Report.xlsb");

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
        onPress={onShare}
      />
      <LargeButton
        width="90%"
        type="f"
        iconName="calculator"
        primaryText="Continue Computations"
        secondaryText="Finish the adjustment computations"
        onPress={onShare}
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
