import React, {PureComponent} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Image,
  Text,
  View,
  Share,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class ListItemRender extends PureComponent {
  constructor(props) {
    super(props);
    this.isi = props.isi;
  }

  onShare = async (terima) => {
    try {
      await Share.share({
        title: 'QuranApp Share',
        message: `Allah Subhanahu wa Ta'ala berfirman:\n"${terima.ar}"\n\nyang artinya:\n"${terima.idn}"\n\n(Surah ${this.props.kiriman.nama_latin} Ayat ${terima.nomor})`,
      });
    } catch (error) {
      alert(error);
    }
  };

  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('terakhirDibaca', jsonValue);
    } catch (e) {
      alert(e);
    }
  };

  alert = () => {
    Alert.alert(
      'Penanda',
      `Surah ${this.props.kiriman.nama_latin} Ayat ${this.isi.nomor} telah disimpan`,
      [
        {
          text: 'Keluar Aplikasi',
          onPress: () => BackHandler.exitApp(),
          style: 'cancel',
        },
        {text: 'Lanjutkan Membaca', onPress: () => null},
      ],
      {cancelable: false},
    );
  };

  nameHandle = (value) => {
    this.props.nameHandle(value);
  };

  render() {
    return (
      <>
        <Text>{JSON.stringify(this.props.ayatTerakhir)}</Text>
        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#dddd',
              padding: 20,
              paddingVertical: 10,
              borderRadius: 10,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                position: 'absolute',
                left: 20,
                top: 10,
              }}>
              <Text
                style={{flex: 1, fontSize: 16, textAlignVertical: 'center'}}>
                {this.isi.nomor}
              </Text>
            </View>
            <Image
              source={{uri: 'https://img.icons8.com/nolan/64/circled.png'}}
              style={{width: 40, height: 40}}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => this.onShare(this.isi)}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 14,
                }}>
                <Image
                  source={{uri: 'https://img.icons8.com/nolan/64/share.png'}}
                  style={{width: 26, height: 26}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => alert('hoi')}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 14,
                }}>
                <Image
                  source={{uri: 'https://img.icons8.com/nolan/64/play.png'}}
                  style={{width: 26, height: 26}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // value.dispatch({ type: 'SIMPAN_AYAT_TERAKHIR', payload: { ayat: this.isi.nomor, nama_latin: this.props.kiriman.nama_latin, nomor: this.props.kiriman.nomor } });
                  this.alert();
                  this.storeData({
                    ayat: this.isi.nomor,
                    nama_latin: this.props.kiriman.nama_latin,
                    nomor: this.props.kiriman.nomor,
                  });
                  this.nameHandle({
                    ayat: this.isi.nomor,
                    nama_latin: this.props.kiriman.nama_latin,
                    nomor: this.props.kiriman.nomor,
                  });
                }}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 14,
                }}>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/nolan/64/bookmark-ribbon.png',
                  }}
                  style={{width: 26, height: 26}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 30, marginVertical: 20}}>
            {this.isi.ar}
          </Text>
          <Text style={{fontSize: 18}}>{this.isi.idn}</Text>
          <View
            style={{
              marginVertical: 25,
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </View>
      </>
    );
    //             }
    //         }
    //     </RootContext.Consumer>
    // )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    nameHandle: (terima) => {
      dispatch({type: 'USER_INPUT', payload: terima});
    },
  };
};
export default connect(null, mapDispatchToProps)(ListItemRender);
