import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import { colors } from "../colors";
import { Card } from "../components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PreviousTraverseScreen = () => {
  useEffect(() => {
    let a = AsyncStorage.getItem("late").then(() => {
      console.log(a);
    });
  }, []);

  const data = [
    {
      key: 1,
      text: "Acrra-001-09/12/22",
    },
    {
      key: 2,
      text: "Acrra-001-09/12/22",
    },
    {
      key: 3,
      text: "Acrra-001-09/12/22",
    },
    {
      key: 4,
      text: "Acrra-001-09/12/22",
    },
    {
      key: 5,
      text: "Acrra-001-09/12/22",
    },
    {
      key: 6,
      text: "Acrra-001-09/12/22",
    },
    {
      key: 7,
      text: "Acrra-001-09/12/22",
    },
    {
      key: 8,
      text: "Acrra-001-09/12/22",
    },
    {
      key: 9,
      text: "Acrra-001-09/12/22",
    },
    {
      key: 10,
      text: "Acrra-001-09/12/22",
    },
    {
      key: 11,
      text: "Acrra-001-09/12/22",
    },
    {
      key: 12,
      text: "Acrra-001-09/12/22",
    },
    {
      key: 13,
      text: "Acrra-001-09/12/22",
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Select One To View & Edit</Text>
      <FlatList
        style={styles.list}
        bounces={true}
        data={data}
        // key={id}
        renderItem={({ item }) => (
          <Card
            width="90%"
            type="mi"
            primaryText={item.text}
            secondaryText={item.text}
            iconName="edit"
            iconSize={40}
          />
        )}
      />
    </View>
  );
};

export default PreviousTraverseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    marginTop: 30,
  },
  list: {},
  head: {
    color: colors.primaryColor,
    fontFamily: "SSBold",
    fontWeight: "700",
    fontSize: 25,
    alignSelf: "flex-start",
    // paddingLeft: 20,
    marginBottom: 50,
  },
});
