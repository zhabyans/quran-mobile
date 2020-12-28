import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {ListItemRender, TrackPlayerInit} from '../../components/molecules';
import SwitchCaseSurah from '../../json/SwitchCaseSurah';

const DetailSurah = (props) => {
  // const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // const [surahx, setSurah] = useState();
  const flatList = useRef();

  useEffect(() => {
    setData(props.route.params.pesan);
    // getDataFromList();
  }, []);

  useEffect(() => {
    return () => {
      // this code will run before the component is unmounted
      TrackPlayer.stop();
    };
  }, []);

  const optional = {};
  if (props.route.params.screen == 'ayatTerakhir') {
    if (props.route.params.pesan.ayat < 5) {
      optional.initialNumToRender = 5;
    } else if (props.route.params.pesan.ayat < 10) {
      optional.initialNumToRender = 10;
    } else if (props.route.params.pesan.ayat < 25) {
      optional.initialNumToRender = 25;
    } else if (props.route.params.pesan.ayat < 50) {
      optional.initialNumToRender = 50;
    } else if (props.route.params.pesan.ayat < 75) {
      optional.initialNumToRender = 75;
    } else if (props.route.params.pesan.ayat < 100) {
      optional.initialNumToRender = 100;
    } else if (props.route.params.pesan.ayat < 150) {
      optional.initialNumToRender = 150;
    } else if (props.route.params.pesan.ayat < 200) {
      optional.initialNumToRender = 200;
    } else {
      optional.initialNumToRender = 300;
    }
  } else {
    optional.initialNumToRender = 2;
  }

  return (
    <>
      {/* {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} size="large" color="purple" /> : */}
      <>
        <FlatList
          {...optional}
          ListHeaderComponent={
            <>
              <View style={styles.container}>
                <View style={styles.box}>
                  <Image
                    style={styles.imageHeader}
                    source={require('../../assets/images/surah-header.png')}
                  />
                  <Text style={styles.titleSurah}>{data.nama_latin}</Text>
                  <Text style={styles.subTitleSurah}>{data.arti}</Text>
                  <Text style={styles.description}>
                    {data.tempat_turun} - {data.jumlah_ayat} AYAT
                  </Text>
                  <Image
                    source={require('../../assets/images/bismillah.png')}
                    style={styles.bismillahImage}
                  />
                </View>
                <TrackPlayerInit
                  kiriman={{
                    surahNumber: props.route.params.pesan.nomor,
                    namaLatin: data.nama_latin,
                  }}
                />
              </View>
            </>
          }
          data={SwitchCaseSurah(props)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <ListItemRender
              isi={item}
              kiriman={{
                nama_latin: props.route.params.pesan.nama_latin,
                nomor: props.route.params.pesan.nomor,
              }}
            />
          )}
          ref={flatList}
          onLayout={() => {
            if (props.route.params.screen == 'ayatTerakhir') {
              flatList.current.scrollToIndex({
                index: props.route.params.pesan.ayat - 1,
                viewPosition: 0.5,
              });
            }
          }}
        />
      </>
      {/* } */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  box: {
    margin: 40,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 30,
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    // zIndex: 2
  },
  imageHeader: {
    width: '100%',
    height: 330,
  },
  titleSurah: {
    fontSize: 34,
    position: 'absolute',
    top: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  subTitleSurah: {
    fontSize: 20,
    position: 'absolute',
    top: 75,
    paddingVertical: 15,
    paddingBottom: 20,
    paddingHorizontal: 70,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: 'white',
  },
  description: {
    position: 'absolute',
    top: 155,
    color: 'white',
    textTransform: 'uppercase',
  },
  bismillahImage: {
    width: '100%',
    height: '18%',
    position: 'absolute',
    top: 220,
    resizeMode: 'contain',
  },
});

export default DetailSurah;
