import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.push('ListSurah')}>
                <Text>Baca Quran</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.push('SettingPage')}>
                <Text>Pengaturan</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'green',
        width: 100,
        height: 60
    }
})

export default Home