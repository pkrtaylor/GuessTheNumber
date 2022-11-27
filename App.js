import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import Colors from './constants/colors';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import AppLoading from 'expo-app-loading'

//fonts
import {useFonts} from 'expo-font'
export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState()
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if(!fontsLoaded){
    return <AppLoading/>
  }
  function pickedNumberhandler(pickedNumber){
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }
  function gameOverHandler(numOfRounds){
    setGameIsOver(true)
    setGuessRounds(numOfRounds)

  }
  function startNewGameHandler(){
      setUserNumber(null)
      setGuessRounds(0)
  }
  
  let screen = <StartGameScreen onPickNumber={pickedNumberhandler}/>

  if(userNumber)
  {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
  }
  //gameIsOver && userNumber
  if(gameIsOver && userNumber){
    
    screen = <GameOverScreen 
    userNumber={userNumber} 
    roundsNumber={guessRounds} 
    onStartNewGame={startNewGameHandler}/>
  }

  

  //we place the rootScreen style in the image background so it also takes up the whole spce 
  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground 
      source={require('./assets/images/background.png')}
      resizeMode='cover'
      style={styles.rootScreen}
      imageStyle={styles.backgroundImage}
      >
      <SafeAreaView style={styles.rootScreen}>
        {screen}
      </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen : {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  }

});
