import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import { colors } from "../colors";
import CustomButton from "../components/CustomButton";

const image = {
  uri: "google.com",
};
const HomeScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.head}>Inside</Text>
        <CustomButton
          color={colors.primaryColor}
          text={"Get Started"}
          width={370}
          onclick={() => {
            navigation.navigate("HomeStack");
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#202020",
  },
  head: {
    color: colors.secondaryColor,
    fontFamily: "SSBold",
    fontWeight: "700",
    fontSize: 40,
    alignSelf: "flex-start",
    // paddingLeft: 20,
    marginBottom: 10,
  },
});
