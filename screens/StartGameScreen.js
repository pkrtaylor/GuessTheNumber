import {TextInput, View, StyleSheet} from 'react-native'
import PrimaryButton from '../components/PrimaryButton'

function StartGameScreen(){


    return(
         <View style={styles.inputContainer}>
           <TextInput 
                style={styles.numberInput} 
                maxLength={2} 
                keyboardType="number-pad"
                autoCorrect={false}/>
           <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Confirm</PrimaryButton>
                </View>
            </View>
         </View>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({
    //lets start with a basic style for he main view element that takes the view away from the edges
    inputContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 100,
        backgroundColor: '#4e0329',
        marginHorizontal: 24 ,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,

    },

    numberInput: {
        height:50,
        width: 50,
        borderBottomColor: '#ddb52f',
        borderBottomWidth: 2,
        fontSize: 32,
        color: '#ddb52f',
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