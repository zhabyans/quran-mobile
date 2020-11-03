import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { Picker } from '@react-native-community/picker';
import Axios from 'axios';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';


const SettingPage = (props) => {
    const [data, setData] = useState([])

    useEffect(() => {
        getDataFromNetwork();
        getData();
    }, []);

    const getDataFromNetwork = async () => {
        try {
            let response = await Axios.get('https://api.npoint.io/b9ad7c02617b8728963e', { timeout: 2000 });
            setData(response.data.reciters)

        } catch (error) {
            console.log(error)
        }
    }


    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('namaReciter', value)
        } catch (e) {
            // saving error
            console.log(e)
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('namaReciter')
            if (value !== null) {
                console.log('get data', value);
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ScrollView>
            <View>
                <Picker
                    selectedValue={props.reciter}
                    style={{ height: 100, width: 450 }}
                    onValueChange={(itemValue, itemIndex) => {
                        props.reciterHandle(itemValue)
                        storeData(itemValue)
                    }
                    }>
                    {data.map((item, index) => (
                        <Picker.Item label={`${item.name} ${item.rewaya}`} value={item.Server} key={item.id} />)
                    )}
                </Picker>
                <Text>{JSON.stringify(data)}</Text>
                {/* <Text>{props.reciter}</Text> */}
                {/* <Text>{getData}</Text> */}
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (nilai) => {
    return {
        reciter: nilai.reciter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        reciterHandle: (terima) => {
            dispatch({ type: "RECITER", payload: terima })
            console.log("dispatch", terima);
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SettingPage)
