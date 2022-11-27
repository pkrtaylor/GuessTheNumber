import {View, Image, StyleSheet, Text} from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton'
import Title from '../components/ui/Title'
import Colors from '../constants/colors'

function GameOverScreen({roundsNumber, userNumber, onStartNewGame}){
    
    return(
        <View style={styles.rootContainer}>
            <Title>GAME OVER</Title>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/images/success.png')}/>
            </View>
            <Text style={styles.summarytText}>
                Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number 
                <Text style={styles.highlight}> {userNumber}</Text>.
            </Text>
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
            
        </View>
    )
}


export default GameOverScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36
    },

    image: {
        width: '100%',
        height: '100%'//refers to the view in which the image is placed
    },
    summarytText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign:'center',
        marginBottom: 24
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
})

//Notes: 
//A Text component can have other text components nested inside them 
//this alows us to differentiate with the styles 
//fontSize on outer Text affects the nested Text
