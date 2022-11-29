import {Text, StyleSheet, Platform} from 'react-native'


function Title({children}){
    return(
        <Text style={styles.title}>{children}</Text>
    )
}


export default Title


const styles = StyleSheet.create({
    title : {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        // fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        // borderWidth: Platform.OS === 'android' ? 2 : 0,
        borderWidth: Platform.select({ios: 0, android: 2}), //this is just an alternative method from the one above
        borderColor: 'white',
        padding: 12,
        minWidth: '80%'
        
        

    }
})