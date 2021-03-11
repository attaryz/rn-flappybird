import React from "react";

import { View, Image, ImageBackground } from "react-native";
import greenPipe from "../assets/pipe-green.png";
import redPipe from "../assets/pipe-red.png";

const Obstacles = ({
  color,
  obstaclesHeight,
  obstaclesLeft,
  obstaclesWidth,
  gap,
  randomBottom,
}) => {
  return (
    <>
      <View
        style={{
          position: "absolute",
          // backgroundColor: color,
          width: obstaclesWidth,
          height: obstaclesHeight,
          left: obstaclesLeft,
          bottom: randomBottom + obstaclesHeight + gap,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            transform: [{ rotate: "180deg" }],
          }}
          source={greenPipe}
        />
      </View>
      <View
        style={{
          position: "absolute",
          //          backgroundColor: color,
          width: obstaclesWidth,
          height: obstaclesHeight,
          left: obstaclesLeft,
          bottom: randomBottom,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={redPipe} />
      </View>
    </>
  );
};

export default Obstacles;
