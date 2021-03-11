import React, { useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ImageBackground,
  StatusBar,
  Button,
} from "react-native";
import AppLoading from "expo-app-loading";

import Bird from "./components/Bird";
import Obstacles from "./components/Obstacles";
import background from "./assets/background-day.png";
//import {useFonts} from 'expo-font'
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';




export default function App() {
 /*  let [fontsLoaded] = useFonts({
    "PressStart2P": require("./assets/fonts/PressStart2P-Regular.ttf"),
  }); */


    let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2 + 30
  );
  const [obstacleNHeight, setObstacleNHeight] = useState(0);
  const [obstacleNHeightTwo, setObstacleNHeightTwo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPause, setIsPause] = useState(false)
  const [score, setScore] = useState(0);
  const obstaclesWidth = 60;
  const obstaclesHeight = 300;
  const gap = 200;
  const gravity = 3;
  let gameTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;

  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom((birdBottom) => birdBottom + 50);
    }
  };
  // start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);
      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [birdBottom]);

  // start the first obstacle
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerId);
        setIsPause(true)
      };
    } else {
      setObstaclesLeft(screenWidth);
      setObstacleNHeight(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstaclesLeft]);

  // start the second obstacle

  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerIdTwo);
        setIsPause(true)
      };
    } else {
      setObstaclesLeftTwo(screenWidth);
      setObstacleNHeightTwo(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstaclesLeftTwo]);

  // check for collisions
  useEffect(() => {
    if (
      // first obstacle
      ((birdBottom < obstacleNHeight + obstaclesHeight + 30 ||
        birdBottom > obstacleNHeight + obstaclesHeight + gap - 30) &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 30) ||
      // second obstacle
      ((birdBottom < obstacleNHeightTwo + obstaclesHeight + 30 ||
        birdBottom > obstacleNHeightTwo + obstaclesHeight + gap - 30) &&
        obstaclesLeftTwo > screenWidth / 2 - 30 &&
        obstaclesLeftTwo < screenWidth / 2 + 30)
    ) {
      gameOver();
    }
  });

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesTimerId);
    clearInterval(obstaclesTimerIdTwo);
    setIsGameOver(true);
  };
  const pauseGame = () => {
    clearInterval(gameTimerId);
    setIsPause(true)
    clearInterval(obstaclesTimerId);
    clearInterval(obstaclesTimerIdTwo);
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    
    return (
      <TouchableWithoutFeedback onPress={jump}>
      <ImageBackground style={styles.image} source={background}>
        <View>
          <Text style={styles.score}>SCORE: {score}</Text>
           <Button
            style={styles.restart}
            onPress={pauseGame}
            title="Pause Game"
            /> 
        </View>
        <View style={styles.container}>
          {isGameOver && <Text>{score}</Text>}
          <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
          <Obstacles
            color={"green"}
            obstaclesWidth={obstaclesWidth}
            obstaclesHeight={obstaclesHeight}
            randomBottom={obstacleNHeight}
            gap={gap}
            obstaclesLeft={obstaclesLeft}
            />
          <Obstacles
            color={"yellow"}
            obstaclesWidth={obstaclesWidth}
            obstaclesHeight={obstaclesHeight}
            randomBottom={obstacleNHeightTwo}
            gap={gap}
            obstaclesLeft={obstaclesLeftTwo}
            />
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  score: {
    //position: "relative",
    top: 50,
    left: 0,
    fontSize: 15,
    //backgroundColor: "#fff",
    //width: 100,
    zIndex: 1,
    fontFamily: "PressStart2P_400Regular",
  },
  restart: {
    width: 50,
    top: 50,
    right: 0,
  },
});
