import React from "react";
import { StatusBar, View, Image, StyleSheet } from "react-native";
import bird from "../assets/bluebird-midflap.png";

const Bird = ({ birdBottom, birdLeft }) => {
  const birdWidth = 50;
  const birdHeight = 60;
  return (
    <View
      style={{
        position: "absolute",
        // backgroundColor: "blue",
        width: birdWidth,
        height: birdHeight,
        left: birdLeft - birdWidth / 2,
        bottom: birdBottom - birdHeight / 2,
        alignItems: "center",
        //   alignContent: 'center',
        justifyContent: "center",
      }}
    >
      <Image style={styles.bird} source={bird} />
    </View>
  );
};
const styles = StyleSheet.create({
  bird: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
});
export default Bird;
