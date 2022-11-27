import { useState } from 'react'
import {TextInput, View, StyleSheet, Alert, Text} from 'react-native'
import Colors from '../constants/colors'
import PrimaryButton from '../components/ui/PrimaryButton'
import Title from '../components/ui/Title'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/InstructionText'



function StartGameScreen({onPickNumber}){
    const [enteredNumber, setEnteredNumber] = useState('')
    //we have it as a string since we are going to bind it to the TextInput Component 
    //by binding we mean we set the value prop to the state "enteredNumber"
    
    function numberInputHandler(enteredText){
            setEnteredNumber(enteredText);
    }

    function resetInputHandler(){
        setEnteredNumber('')
    }
    function confirmInputHandler(){
        const chosenNumber = parseInt(enteredNumber);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99)
        {
            //show allert 
            //react native exposes an alert api // an object that holds a method to call an alert
            Alert.alert(
                'Invalid Number', 
                'Number has to be a number between 1 and 99',
                [{text: 'Okay', style:'destructive', onPress: resetInputHandler }]
                );
            return; // cancel the functions exection 
        }

        onPickNumber(chosenNumber)
    } 
    //note to self the onPress prop in the primary button is not a built in prop, its custom 
    //the onPress prop in pressable component is builtin 
    return(
        <View style={styles.rootContainer}>
         <Title>Guess My Number</Title>
         <Card>
            <InstructionText>Guess My Number</InstructionText>
           <TextInput 
                style={styles.numberInput} 
                maxLength={2} 
                keyboardType="number-pad"
                autoCorrect={false}
                autoCapitalize="none"
                value={enteredNumber}
                onChangeText={numberInputHandler}
                />
           <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                    onPress={resetInputHandler}
                    >Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton
                    onPress={confirmInputHandler}
                    >Confirm</PrimaryButton>
                </View>
            </View>
         </Card>
        </View>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({

    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    },

    //lets start with a basic style for he main view element that takes the view away from the edges
    

    numberInput: {
        height:50,
        width: 50,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        fontSize: 32,
        color: Colors.accent500,
        marginVertical: 8, /// adds margin on top and bottom i think
        fontWeight: 'bold',
        textAlign:'center'
        
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
})