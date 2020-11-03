import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler';

const Welcome = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quran App</Text>
            <Text style={styles.subTitle}>Learn Quran and Recite once everyday</Text>
            <Image source={require('../assets/images/welcome.png')} style={styles.image} />
            <TouchableOpacity onPress={() => alert('haha')}>
                <View style={styles.button}>
                    <Text style={styles.fontButton}>
                        Get Started
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#512DA8',
        marginBottom: 14
    },
    subTitle: {
        fontSize: 19,
        color: '#555',
        maxWidth: 160,
        textAlign: 'center',
        lineHeight: 30,
        marginBottom: 40
    },
    image: {
        borderRadius: 30,
        width: '80%',
        height: '66%',
        marginBottom: -30,
        backgroundColor: 'yellow'
    },
    button: {
        width: 150,
        height: 50,
        backgroundColor: '#FF9800',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    fontButton: {
        fontSize: 21,
        color: 'white',
        fontWeight: 'bold'
    }

})

export default Welcome;