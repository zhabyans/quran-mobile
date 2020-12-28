import React, {useState, useEffect} from 'react';
import TrackPlayer, {
  TrackPlayerEvents,
  STATE_STOPPED,
} from 'react-native-track-player';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const TrackPlayerInit = (props) => {
  const [isInit, setIsInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('Play Audio');
  const [reciter, setReciter] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getDataAudio = () => {
    var str = props.kiriman.surahNumber;
    var res = str.toString().length;
    if (res == 1) {
      return `${reciter}/00${str}.mp3`;
    } else if (res == 2) {
      return `${reciter}/0${str}.mp3`;
    } else {
      return `${reciter}/${str}.mp3`;
    }
  };

  const songDetails = {
    id: props.kiriman.surahNumber,
    url: getDataAudio(),
    title: props.kiriman.namaLatin,
    album: 'Al-Quran',
    artist: 'Mishary Alafasy',
    artwork: 'https://picsum.photos/300',
  };

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], (event) => {
    if (event.state === STATE_STOPPED && isInit == true) {
      setIsInit(false);
      setIsPlaying(false);
      setText('Replay Audio');
    }
  });

  const TrackPlayerInit = async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_JUMP_FORWARD,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });
    await TrackPlayer.add({
      id: songDetails.id,
      url: songDetails.url,
      type: 'default',
      title: songDetails.title,
      album: songDetails.album,
      artist: songDetails.artist,
      artwork: songDetails.artwork,
    });
    await TrackPlayer.play();
    setIsInit(true);
    setIsPlaying(true);
    setText('Pause Audio');
  };

  const onButtonPlayPause = () => {
    if (isPlaying) {
      TrackPlayer.pause();
      setText('Resume Audio');
      setIsPlaying(false);
    } else {
      TrackPlayer.play();
      setText('Pause Audio');
      setIsPlaying(true);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('namaReciter');
      if (value !== null) {
        setReciter(value);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          top: -20,
        }}>
        <TouchableOpacity
          style={{
            width: 130,
            height: 40,
            backgroundColor: '#FF9800',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
          }}
          onPress={() => {
            if (isInit == false && isPlaying == false) {
              TrackPlayerInit();
            } else {
              onButtonPlayPause();
            }
          }}>
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              fontWeight: 'bold',
            }}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const mapStateToProps = (nilai) => {
  return {
    reciter: nilai.reciter,
  };
};

export default connect(mapStateToProps)(TrackPlayerInit);
