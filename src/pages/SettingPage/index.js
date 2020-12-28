import React, {useState, useEffect} from 'react';
import {Text, View, Button, BackHandler} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Axios from 'axios';
import {connect, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import {setLoading} from '../../redux/action';
import {useFocusEffect} from '@react-navigation/native';

const SettingPage = (props) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getDataFromNetwork();
    getData();
  }, []);

  const getDataFromNetwork = async () => {
    dispatch(setLoading(true));
    try {
      let response = await Axios.get(
        'https://api.npoint.io/b9ad7c02617b8728963e',
      );
      setData(response.data.reciters);
      dispatch(setLoading(false));
    } catch (error) {
      alert(error);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('namaReciter', value);
    } catch (e) {
      alert(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('namaReciter');
      if (value !== null) {
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <ScrollView>
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <Text style={{fontSize: 18, marginBottom: 10}}>
          Silakan pilih pembaca quran:
        </Text>
        <View
          style={{borderColor: '#aaa', borderWidth: 1, borderStyle: 'solid'}}>
          <Picker
            selectedValue={props.reciter}
            style={{
              color: '#333',
              height: 50,
            }}
            onValueChange={(itemValue, itemIndex) => {
              props.reciterHandle(itemValue);
              storeData(itemValue);
            }}>
            {data.map((item, index) => (
              <Picker.Item
                label={`${item.name} ${item.rewaya}`}
                value={item.Server}
                key={item.id}
              />
            ))}
          </Picker>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (nilai) => {
  return {
    reciter: nilai.reciter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reciterHandle: (terima) => {
      dispatch({type: 'RECITER', payload: terima});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
