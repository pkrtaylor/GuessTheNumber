import {View, Text, Pressable, StyleSheet} from 'react-native'

function PrimaryButton({children}){

    function presshandler(){
        console.log('Pressed')
    }
    // on the pressable component, the style prop can take in a function, this function comes with a built in boolean called pressed that can be passed in
    //you can pass an array of styles in style prop in  the pressable component 
    return(
    <View style={styles.buttonOuterContainer}>
       <Pressable style={({pressed}) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer} onPress={presshandler} android_ripple={{color:'640233'}}>
       <Text style={styles.buttonText}>
        {children}
        </Text>  
        </Pressable>   
    </View>
  
)
}

export default PrimaryButton


const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'// ensures that any styling from inside that container would go outside of that container it would be clipped

    },
    buttonInnerContainer: {
        backgroundColor: '#72063c',
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation:2,
    },

    buttonText: {
        color:'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75, //passes in a number betwen 0 and 1 and it is then turned into a percentage

    }
})