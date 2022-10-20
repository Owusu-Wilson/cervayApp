// import { Button, StyleSheet, Text, View } from "react-native";
// import React, { useEffect, useState } from "react";
// import { colors } from "../colors";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import CustomButton from "../components/CustomButton";
// import { FontAwesome } from "@expo/vector-icons";
// const ReportScreen = () => {
//   const [data, setData] = useState("");

//   const getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem("user_info");
//       if (value !== null) {
//         // value previously stored
//         setData(JSON.parse(value));
//       }
//     } catch (e) {
//       // error reading value
//     }
//   };
//   useEffect(() => {
//     getData();
//   });
//   return (
//     <View style={styles.container}>
//       <View style={styles.top}>
//         <View style={styles.card}>
//           <FontAwesome name="user" size={45} color="white" />
//           <Text style={styles.username}>{data.name}</Text>
//         </View>
//         {/* <Text style={styles.label}>Top</Text> */}
//       </View>
//       <View style={styles.down}>
//         <Text style={styles.label}>Name</Text>
//         <Text style={styles.dataText}>{data.name}</Text>
//         <Text style={styles.label}>Location</Text>
//         <Text style={styles.dataText}>{data.location}</Text>
//         <Text style={styles.label}>Date</Text>
//         <Text style={styles.dataText}>{data.date}</Text>
//       </View>
//       {/* <Text style={styles.label}>Name</Text>
//       <Text style={styles.label}>{data.name}</Text>
//       <Text style={styles.label}>Location</Text>
//       <Text style={styles.label}>{data.location}</Text>
//       <Text style={styles.label}>Current Traverse on</Text>
//       <Text style={styles.label}>{data.date}</Text>*/}
//       {/* <View style={styles.btnContainer}>
//         <CustomButton
//           style={styles.btn}
//           color={colors.primaryColor}
//           text={"Generate Report"}
//           width={370}
//           onclick={() => {}}
//         />
//       </View> */}
//     </View>
//   );
// };
// ===================================
import * as React from 'react';
import { View, StyleSheet, Button, Platform, Text } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

export default function ReportScreen() {
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <View style={styles.container}>
      <Button title="Print" onPress={print} />
      <View style={styles.spacer} />
      <Button title="Print to PDF file" onPress={printToFile} />
      {Platform.OS === 'ios' && (
        <>
          <View style={styles.spacer} />
          <Button title="Select printer" onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
    </View>
  );
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    fontSize: 25,
    alignSelf: "flex-start",
  },
  dataText: {
    color: colors.primaryColor,
    fontFamily: "SSRegular",
    fontSize: 25,
    alignSelf: "flex-start",
    paddingBottom: 20,
  },
  username: {
    color: "white",
    fontFamily: "SSBold",
    fontSize: 45,
    alignSelf: "center",
    textAlign: "center",
  },
  btnContainer: {
    // backgroundColor: "yellow",
    flex: 1 / 5,
    marginHorizontal: 20,
    top: "30%",
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
});
