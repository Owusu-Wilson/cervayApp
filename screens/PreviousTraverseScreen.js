import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

import { colors } from "../colors";
import { Card } from "../components/Card";

const PreviousTraverseScreen = () => {
  const data = [
    {
      key: 1,
      text: "Legon-001-09/12/22",
    },
    {
      key: 2,
      text: "Legon-001-09/12/22",
    },
    {
      key: 3,
      text: "Legon-001-09/12/22",
    },
    {
      key: 4,
      text: "Legon-001-09/12/22",
    },
    {
      key: 5,
      text: "Legon-001-09/12/22",
    },
    {
      key: 6,
      text: "Legon-001-09/12/22",
    },
    {
      key: 7,
      text: "Legon-001-09/12/22",
    },
    {
      key: 8,
      text: "Legon-001-09/12/22",
    },
    {
      key: 9,
      text: "Legon-001-09/12/22",
    },
    {
      key: 10,
      text: "Legon-001-09/12/22",
    },
    {
      key: 11,
      text: "Legon-001-09/12/22",
    },
    {
      key: 12,
      text: "Legon-001-09/12/22",
    },
    {
      key: 13,
      text: "Legon-001-09/12/22",
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
