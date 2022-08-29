import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../colors";
import CustomButton from "../components/CustomButton";
import InputBar from "../components/InputBar";
import { addData, getData } from "./dbfunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FileSystem from "expo-file-system";
// import {} from  ''
// import fs from "fs/promises"

const HomeScreen = ({ navigation }) => {
  const [station, setStation] = useState("");
  let [traverseCount, setTraverseCount] = useState(1);
  let [pageNumber, setPageNumber] = useState(1);
  const [traverseData, setTraverseData] = useState(Array());
  const [description_1, setDescription_1] = useState("");
  const [description_2, setDescription_2] = useState("");
  const [bearingLL1, setBearingLL1] = useState("");
  const [bearingLL2, setBearingLL2] = useState("");
  const [bearingRR1, setBearingRR1] = useState("");
  const [bearingRR2, setBearingRR2] = useState("");

  const desc_list = {
    id: traverseCount,
    traverseStation: station,
    desc_1: description_1,
    desc_2: description_2,

    bearings: {
      LL1: bearingLL1,
      LL2: bearingLL2,
      RR1: bearingRR1,
      RR2: bearingRR2,
    },
  };

  function clearFields() {
    setDescription_1("");
    setDescription_2("");
    setBearingLL1("");
    setBearingLL2("");
    setBearingRR1("");
    setBearingRR2("");
  }

  function handleDone() {
    // setTraverseData(traverseData);
    // console.log(traverseData);
    // addData(traverseData);
    // let output = AsyncStorage.getItem("traverse");
    // console.log(JSON.parse(output));
    console.log(FileSystem.documentDirectory);
    navigation.navigate("TraverseAction");
  }
  function next() {
    setTraverseCount(traverseCount + 1);
    setPageNumber((pageNumber += 1));
    alert(typeof traverseData);
    // setTraverseData(traverseData.push(desc_list));
    // AsyncStorage.setItem("traverse", JSON.stringify(traverseData));
    // Clearing the fields after next is clicked
    setStation("");
    clearFields();
  }
  function back() {
    // alert("Pressed back");
    setPageNumber((pageNumber -= 1));
  }
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Traverse</Text>
      <Text style={styles.secondaryText}>Traverse Sheet {pageNumber}</Text>
      {/* <Text style={styles.secondaryText}>
        {pageNumber} of {traverseCount}
      </Text> */}
      <Text style={styles.label}>Instrument Station</Text>
      <InputBar
        style={styles.stationField}
        placeholder="Instrument station"
        value={station}
        onChangeText={(text) => setStation(text)}
        width={400}
      />
      {/* Row 1  - Backsite a*/}
      <View style={styles.row}>
        <InputBar
          style={styles.stationField}
          placeholder="Description 1"
          value={description_1}
          multiline={true}
          onChangeText={(text) => setDescription_1(text)}
        />
        <Text style={styles.desc}>LL </Text>
        <InputBar
          style={styles.stationField}
          placeholder="000 00 00"
          dataType="number"
          value={bearingLL1}
          onChangeText={(text) => setBearingLL1(text)} //set LL1
        />
      </View>
      {/* Row 2 - Foresite a*/}
      <View style={styles.row}>
        <InputBar
          style={styles.stationField}
          placeholder="Description 2"
          value={description_2}
          multiline={true}
          onChangeText={(text) => setDescription_2(text)}
        />
        <Text style={styles.desc}>LL </Text>
        <InputBar
          style={styles.stationField}
          placeholder="000 00 00"
          dataType="number"
          value={bearingLL2}
          onChangeText={(text) => setBearingLL2(text)} //SET LL2
        />
      </View>
      {/* Row 3 - foresite b */}
      <View style={styles.row}>
        <InputBar
          style={styles.stationField}
          placeholder="Description 2"
          value={description_2}
          multiline={true}
          editable={false}
          // onChangeText={(text) => setDescription_3(text)}
        />
        <Text style={styles.desc}>RR </Text>
        <InputBar
          style={styles.stationField}
          placeholder="000 00 00"
          dataType="number"
          value={bearingRR1}
          onChangeText={(text) => setBearingRR1(text)} //SET RR1
        />
      </View>
      {/* Row 4  - backsite b*/}
      <View style={styles.row}>
        <InputBar
          style={styles.stationField}
          placeholder="Description 1"
          value={description_1}
          multiline={true}
          editable={false}
          onChangeText={(text) => setDescription_4(text)}
        />
        <Text style={styles.desc}>RR </Text>
        <InputBar
          style={styles.stationField}
          placeholder="000 00 00"
          dataType="number"
          value={bearingRR2}
          onChangeText={(text) => setBearingRR2(text)} //SET RR2
        />
      </View>
      {/* ================================================================= */}
      <View style={styles.buttonsTab}>
        <CustomButton
          color={colors.primaryColor}
          type="outline"
          text={"Back"}
          width="90%"
          onclick={back}
          disabled={pageNumber == 1 ? true : false}
        />
        <CustomButton
          color={colors.primaryColor}
          type="outline"
          text={"Clear All"}
          width="90%"
          onclick={clearFields}
        />
        <CustomButton
          color={colors.primaryColor}
          type="outline"
          text={"Next"}
          width="90%"
          onclick={next}
        />
      </View>
      <CustomButton
        color={colors.primaryColor}
        text={"Done"}
        width={370}
        onclick={handleDone}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  stationField: {
    alignSelf: "flex-start",
  },
  desc: {
    color: "black",
    fontFamily: "SSBold",
    fontSize: 25,
    alignSelf: "center",
    alignItems: "center",
  },
  head: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    fontWeight: "700",
    fontSize: 40,
    alignSelf: "flex-start",
  },

  label: {
    color: "black",
    fontFamily: "SSRegular",
    fontSize: 35,
    alignSelf: "flex-start",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonsTab: {
    flexDirection: "row",
    alignContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginTop: 20,
    justifyContent: "space-around",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: colors.primaryColor,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: colors.secondaryColor,
    marginTop: 5,
    borderColor: colors.primaryColor,
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: colors.primaryColor,
    fontWeight: "700",
    fontSize: 16,
  },
});
