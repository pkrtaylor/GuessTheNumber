import { useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert, FlatList} from 'react-native'
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title'
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import {Ionicons} from '@expo/vector-icons'
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    //The Math.floor() function always rounds down and returns the largest integer less than or equal to a given number
    //we can exclude a certain number if generated, so we can immediately guess the number chosen by the user 
    //extra difficulty added for the phone
    //Math.random() generates a number between 0 and 1
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

  //we can initialize variables outside the compoent so they wont change when a re-render happens 
  let minBoundary = 1;
  let maxBoundary= 100;
  //we use 100 and not 99 becasue the upper boundary will be excluded

function GameScreen({userNumber, onGameOver}){
    
    const initalGuess= generateRandomBetween(
        1,
        100, 
        userNumber)
    //important thing to note is the function above will run everytime the gamescreen component is executed 
    //this is the case when a new guess is set becasue of our useEffect 
    //the problem is that this function will be executed even when min and max bounds are the same, which wil be when the answer is found 
     //becasue the useEffect runs after the ender of the component, the code snippet above will run(causing crash) before the gameOver function can run in the useEffect,so the work around is to hard code 1 and 100 as the min and max bounds
    const [currentGuess, setCurrentGuess] = useState(initalGuess)
    const [guessRounds, setGuessRounds] = useState([initalGuess])
    useEffect(() =>{
        if(currentGuess === userNumber)
        {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(()=>{
        minBoundary = 1;
        maxBoundary = 100;

    },[])
    
    
    //this function takes a parameter "direction" which takes in a string that could be called lower or greater
    //if lower generate a lower number vice versa
    function nextGuessHandler(direction){
        //if current guess is smaller than answer and lower is picked, then the user is lying becasue why would ypu pick lower if the asnwer is greater than the current guess
        if(
        (direction === 'lower' && currentGuess < userNumber) || 
        (direction === 'greater' && currentGuess > userNumber) 
        ){
            Alert.alert(
                "Dont lie!", 
                'You know that this is wrong...', [
                    {text: 'Sorry!', style: 'cancel'}
                ]);
            return;
        }


        if(direction === 'lower'){
            //if we need to guess lower our max boundary is our current guess
            maxBoundary = currentGuess; //since currentGuess was too high, and has to be -1 becuase if current guess was our guess game would be over, but remember the function ignores upperbound so we dont do -1 
        }
        else{
            //if guess should be greater than our new min is the current guess +1// it was too small so we must start there and guess higher
            minBoundary = currentGuess + 1
        }
        console.log(currentGuess)
        console.log(minBoundary, maxBoundary)
        const newRndNumber= generateRandomBetween(
            minBoundary, 
            maxBoundary, 
            currentGuess
            );
        setCurrentGuess(newRndNumber);
        setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds ] )
        //newRndNumber goes first so the log shows the latests numbers at the top
    }
    
    const guessRoundsListLength = guessRounds.length
    return(
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color='white'/>
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color='white'/>
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer} >
                {/*we use guessRound as the key cuz we know that the numbers can never be repeated*/ }
                {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
                <FlatList 
                    data={guessRounds} 
                    renderItem={(itemData)=><GuessLogItem 
                        roundNumber={guessRoundsListLength - itemData.index} 
                        guess={itemData.item}
                        >
                            {itemData.item}
                        </GuessLogItem>}
                    keyExtractor={(item)=> item}
                    />
            </View>
        </View>
    )
}

export default GameScreen

//nextGuessHandler.bind() allows you to preconfigure the paramter value that will be used in a future fucntion execution
//the first value of bind sets the "this" keyword 
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    instructionText: {
        marginBottom: 12,
    },
    listContainer: {
        flex: 1,
        padding: 16
    }

})


//NOTES:
/* 
Once a new game starts we will need to reset the min and max boundary
currently we are managing the min and max as regular variables outside the component
because i want them to be independent from the component function
when the compoent function is RE-Executed the two values should not be resent back to 1 and 100
but we do want to reset if a new game starts, to achieve this we can use useEffect
in the useEffect we want it to run when ever the game screen component is rendered for the first time so only once 
we do this by adding epmty brackets
so the way it works is if the component is removed from the UI and added again then it will run, but the useEffect will not run if the 
component was already on the ui and now just updated because the state changed

Flatlist is best option to use when mapping data in to elements 
Flatlist has data prop that points at the array that holds the data
*/