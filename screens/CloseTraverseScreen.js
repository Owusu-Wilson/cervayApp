import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../colors";
import InputBar from "../components/InputBar";
import CustomButton from "../components/CustomButton";

const CloseTraverseScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Close / Loop Traverse</Text>
      <Text style={styles.secondaryText}>
        Enter the coordinates for your pillars
      </Text>
      {/* =========================================== */}
      <Text style={styles.initialPillarLabel}>Intrument station</Text>
      <View style={styles.row}>
        <Text style={styles.label}>X Coord.</Text>

        <InputBar
          placeholder="00000.000"
          value={""}
          onChangeText={(text) => {}}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Y Coord.</Text>

        <InputBar
          placeholder="00000.000"
          value={""}
          onChangeText={(text) => {}}
        />
      </View>
      {/* =========================================== */}
      <Text style={styles.closureLabel}>Reference</Text>
      <View style={styles.row}>
        <Text style={styles.label}>X Coord.</Text>

        <InputBar
          placeholder="00000.000"
          value={""}
          onChangeText={(text) => {}}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Y Coord.</Text>

        <InputBar
          placeholder="00000.000"
          value={""}
          onChangeText={(text) => {}}
        />
      </View>
      {/* ====================================== */}

      {/* ====================================== */}
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

      <CustomButton
        color={colors.primaryColor}
        text={"Done"}
        width={370}
        onclick={() => {
          navigation.navigate("TraverseEntry");
        }}
      />
    </View>
  );
};

export default CloseTraverseScreen;

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
    // paddingLeft: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // paddingVertical: 20,
  },
  secondaryText: {
    color: colors.primaryColor,
    fontFamily: "SSRegular",
    // fontWeight: "700",
    fontSize: 20,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  label: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    alignContent: "center",
    textAlign: "center",
    fontSize: 20,
    alignSelf: "flex-start",
    marginBottom: 30,
    paddingRight: 40,
  },
  initialPillarLabel: {
    color: colors.hue,
    fontFamily: "SSBold",
    alignContent: "center",
    textAlign: "center",
    fontSize: 25,
    alignSelf: "flex-start",
    marginTop: 20,
    marginBottom: 30,
    paddingRight: 40,
  },
  closureLabel: {
    color: colors.hue,
    fontFamily: "SSBold",
    alignContent: "center",
    textAlign: "center",
    fontSize: 25,
    alignSelf: "flex-start",
    marginTop: 40,
    marginBottom: 30,
    paddingRight: 40,
  },
  inputField: {
    paddingLeft: 30,
  },
});
