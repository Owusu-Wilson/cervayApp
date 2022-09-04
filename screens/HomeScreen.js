import {
  Alert,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";

import React, { useState } from "react";
import { colors } from "../colors";
import CustomButton from "../components/CustomButton";
import InputBar from "../components/InputBar";
import { addData, getData } from "./dbfunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FileSystem from "expo-file-system";
import { AntDesign } from "@expo/vector-icons";
// import {} from  ''
// import fs from "fs/promises"

const TraverseSheetModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [station, setStation] = useState("");
  let [traverseCount, setTraverseCount] = useState(1);
  let [pageNumber, setPageNumber] = useState(1);
  const [traverseData, setTraverseData] = useState([]);
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
    traverseData.push(desc_list);
    navigation.navigate("TraverseAction");
  }
  function next() {
    if (pageNumber == traverseCount) {
      setTraverseCount(traverseCount + 1);
    }

    setStation("");
    clearFields();
  }
  function back() {
    setPageNumber((pageNumber -= 1));
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.head}>Traverse</Text>
        <AntDesign style={styles.topIcon} name="infocirlce" size={30} />
      </View>
      {/* <Text style={styles.secondaryText}>
        {pageNumber} of {traverseCount}
      </Text> */}
      <View style={styles.counterRow}>
        <Text style={styles.label}>Instrument Station</Text>
      </View>
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
        {/* <CustomButton
          color={colors.primaryColor}
          type="outline"
          text={"Back"}
          width="90%"
          onclick={back}
          disabled={pageNumber == 1 ? true : false}
        /> */}
        <CustomButton
          color={colors.primaryColor}
          type="outline"
          text={"Clear All"}
          width="70%"
          onclick={clearFields}
        />
        <CustomButton
          color={colors.primaryColor}
          type="outline"
          text={"Next"}
          width="70%"
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
    // justifyContent: "flex-start",
  },
  counterRow: {
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
  topIcon: {
    alignSelf: "center",
    left: 200,
  },
});
