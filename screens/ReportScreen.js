import { FontAwesome } from "@expo/vector-icons";

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Platform, Text } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { colors } from "../colors";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "react-native-paper";
import moment from "moment";
export default function ReportScreen() {
  const [user_details, setUserDetails] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [toStations, setToStations] = useState([]);
  let timeStamp = moment().toDate(user_details.date);
  let date =
    String(timeStamp.toUTCString().split(" ")[0]) +
    " " +
    String(timeStamp.toUTCString().split(" ")[1]) +
    " " +
    String(timeStamp.toUTCString().split(" ")[2]) +
    " " +
    String(timeStamp.toUTCString().split(" ")[3]);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user_info");
      if (value !== null) {
        // value previously stored
        setUserDetails(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };
  const getCoordinates = async () => {
    try {
      const value = await AsyncStorage.getItem("coordinates");
      if (value !== null) {
        // value previously stored
        setCoordinates(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };
  const getStations = async () => {
    try {
      const value = await AsyncStorage.getItem("to_stations");
      if (value !== null) {
        // value previously stored
        setToStations(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
    //  getCoordinates()
    getStations();
  });

  let coordinates_x = [];
  let coordinates_y = [];

  coordinates.forEach((element) => {
    coordinates_x.push(element.x);
    coordinates_y.push(element.y);
  });

  var structuredData = []; //a 2D array

  for (let index = 0; index < toStations.length; index++) {
    structuredData.push([
      toStations[index],
      coordinates_x[index],
      coordinates_y[index],
    ]);
  }
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };
  var structuredData = [
    ["me 1", 61234.65, 1221221.43],
    ["me 1", 61234.65, 1221221.43],
    ["me 1", 61234.65, 1221221.43],
    ["me 1", 61234.65, 1221221.43],
    ["me 1", 61234.65, 1221221.43],
    ["me 1", 61234.65, 1221221.43],
  ];
  const htmltable = (listdata) => {
    let t = "";
    for (let i in listdata) {
      const item = listdata[i];
      t =
        t +
        `<tr>
          <td>${item[0]}</td>
          <td>${item[1]}</td>
          <td>${item[2]}</td>
        </tr>`;
    }
    return t;
  };
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };
  // traverse_data
  const retrieveData = async (id) => {
    try {
      const value = await AsyncStorage.getItem(id);
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  // =============================================
  const html = `
  <html>
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
    />
  </head>
  <body style="text-align: justify; padding: 10px">
    <div style="text-align: center">
      <h1
        style="
          font-size: 30px;
          font-family: Helvetica Neue;
          font-weight: normal;
        "
      >
        SURVEY REPORT
      </h1>
      <p><b> Surveyor's Name: </b> ${user_details.name}</p>
      <p><b> Survey Date: </b> ${date}</p>
      <p><b> Survey Location: </b> ${user_details.location}</p>
    </div>
    <hr />
    <table
      style="
        width: 90%;
        margin-top: 20px;
        text-align: center;
        font-family: Helvetica Neue;
        font-weight: normal;
        font-size: 20px;
      "
    >
      <th style="font-weight: bold">From Stations</th>
      <th style="font-weight: bold">Coordinates X</th>
      <th style="font-weight: bold">Coordinates Y</th>
      <tr>
        ${htmltable(structuredData)}
      </tr>
    </table>
    <h3 style="justify-content: left">Misclose: <b>0.00009</b></h3>
  </body>
</html>
`;

  // let data = retrieveData('traverse_data')
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Surveyor's Name</Text>
      <Text style={styles.dataText}>{user_details.name}</Text>
      <Text style={styles.label}>Survey Date</Text>
      <Text style={styles.dataText}>{date}</Text>
      <Text style={styles.label}>Survey Location</Text>
      <Text style={styles.dataText}>{String(user_details.location)}</Text>

      {/* <View style={styles.btnContainer}> */}

      <CustomButton
        color={colors.primaryColor}
        text="Print"
        onclick={() => {
          printToFile();
        }}
      />

      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    padding: 10,
  },
  label: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    fontSize: 30,

    // padding: 10,
    marginBottom: 10,
  },
  dataText: {
    color: colors.primaryColor,
    fontFamily: "SSRegular",
    fontSize: 20,
    marginBottom: 50,
  },

  btnContainer: {
    marginHorizontal: 20,
  },
  btn: {
    height: 60,
  },
  top: {
    flex: 4 / 10,
    // backgroundColor: colors.action/ButtonColor,
    paddingTop: 40,
  },
  down: {
    display: "flex",
    flex: 6 / 10,
    // backgroundColor: "white",
    paddingLeft: 20,
    // borderRadius: 100,
  },
  card: {
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",

    backgroundColor: colors.primaryColor,
    width: "90%",
    height: "80%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "black",
    elevation: 10,
    shadowOffset: 0.3,
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  btnContainer: {
    // backgroundColor: "yellow",
    flex: 1 / 5,
    top: "40%",
  },
});
