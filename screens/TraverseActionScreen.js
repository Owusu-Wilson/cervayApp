import { StyleSheet, Text, View, Share, Alert } from "react-native";
import React from "react";
import { colors } from "../colors";
import { Card } from "../components/Card";
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from "@expo/vector-icons";

export default function TraverseActionScreen({ navigation, data }) {
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
      <Card onPress={onShare} icon="download" text="Export Traverse Data" />
      <Card
        icon="calculator"
        onPress={handleContinue}
        text="Continue To Adjustments"
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
