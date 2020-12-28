import React from 'react';
import {Button, StyleSheet, View, Text, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Home = (props) => {
  return (
    <ImageBackground
      style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}
      source={require('../../assets/images/afdhal-n-XkOewE7rGQo-unsplash.png')}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.push('ListSurah')}>
          <Text style={styles.textButton}>Baca Quran</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.push('SettingPage')}>
          <Text style={styles.textButton}>Pengaturan</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#593C23',
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;
