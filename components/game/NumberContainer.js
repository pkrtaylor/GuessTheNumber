import {View, Text, StyleSheet, Dimensions} from 'react-native'
import Colors from '../../constants/colors'


function NumberContainer({children}){

    return(
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

export default NumberContainer

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({

    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: deviceWidth < 380 ? 12 : 24,
        borderRadius: 8, // remember borderRadius is not supported on the Text element, must cover with View
        alignItems: 'center',
        justifyContent: 'center',
        margin:  deviceWidth < 380 ? 12 : 24
    },

    numberText: {
        fontFamily: 'open-sans-bold',
        color: Colors.accent500,
        fontSize:  deviceWidth < 380 ? 28 : 36,
        // fontWeight:'bold'

    }
})