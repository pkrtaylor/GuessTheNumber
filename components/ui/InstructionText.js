import {Text, StyleSheet} from 'react-native'
import Colors from '../../constants/colors'

function InstructionText({children, style}){
    //putting style at the end of the array could possibly allow it to override previous styles in the array
    return(
        <Text style={[styles.instructionText, style]}>{children}</Text>
    )
}


export default InstructionText


const styles = StyleSheet.create({
    instructionText  : {
        fontFamily: 'open-sans',
        color: Colors.accent500,
        fontSize: 24,
    },
})