import React, { useEffect, useState, PureComponent } from 'react'
import { Text, View, Image, StyleSheet, ActivityIndicator, FlatList, Button } from 'react-native'
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import ListSurahSource from './json/ListSurahSource.json'

const ListSurah = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isReady, setIsReady] = useState()

    useEffect(() => {
        // getDataFromNetwork();
        // getDataStorageToRedux();
    }, []);

    const getDataFromNetwork = async () => {
        try {
            let response = await Axios.get('https://equran.id/api/surat', { timeout: 2000 });
            setIsReady(true)
            setData(response.data)
            setLoading(false)
        } catch (error) {
            setIsReady(false)
            console.log(error)
        }
    }

    const getDataStorageToRedux = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('terakhirDibaca')
            jsonValue != null ? props.ayatTerakhirHandle(JSON.parse(jsonValue)) : null;
            console.log("ini JSON : ", JSON.parse(jsonValue))
        } catch (e) {
            console.log(e)
        }
    }

    class ListItemRender extends PureComponent {
        constructor({ isi }) {
            super()
            this.isi = isi
        }
        render() {
            return (
                <>
                    <TouchableOpacity onPress={() => props.navigation.push('DetailSurah', { pesan: this.isi, screen: 'ayatPilihan', surahNumber: this.isi.nomor })}>
                        <View style={styles.container}>
                            <View style={styles.containerRow}>
                                <Text style={styles.number}>{this.isi.nomor}</Text>
                                <View style={styles.surahRow}>
                                    <Text style={styles.surah}>{this.isi.nama_latin}</Text>
                                    <Text style={styles.surahDetail}>{this.isi.tempat_turun} - {this.isi.jumlah_ayat} AYAT</Text>
                                </View>
                                <Text style={styles.arabic}>{this.isi.nama}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </>
            )
        }
    }

    const Home = () => {
        return (
            <>

                <View style={styles.containerHome}>
                    <Text style={styles.salam}>Assalamualaikum</Text>
                    <Text style={styles.name}>Muhammad Zhafran Zhabyansyah</Text>
                    <TouchableOpacity onPress={() => {
                        if (props.ayatTerakhir == null) {
                            alert('Anda belum simpan ayat terakhir')
                        } else {
                            props.navigation.push('DetailSurah', { pesan: props.ayatTerakhir, screen: 'ayatTerakhir', })
                        }
                    }
                    }>
                        <View style={styles.lastReadContainer} >
                            <Image style={styles.lastSurahImage} source={require('../assets/images/last-surah.png')} />
                            <View style={styles.lastReadContainerText}>
                                <View style={styles.lastReadRow}>
                                    <Image source={{ uri: 'https://img.icons8.com/color/96/000000/open-book.png' }} style={{ width: 22, height: 22, marginRight: 10 }} />
                                    <Text style={styles.lastReadText}>Terakhir Dibaca</Text>
                                </View>
                                <Text style={styles.surahTerakhir}>{props.ayatTerakhir == null ? 'Belum Dibaca' : props.ayatTerakhir.nama_latin}</Text>
                                <Text style={styles.ayah}>{props.ayatTerakhir == null ? '' : 'Ayat ke - ' + props.ayatTerakhir.ayat}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    if (isReady == false) {
        return (
            <View style={{
                flex: 1, alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>Periksa Koneksi Anda!</Text>
                <Button title='Coba Lagi' onPress={() => getDataFromNetwork()} />
            </View>
        )
    } else {
        return (
            <>
                {isLoading ? <ActivityIndicator style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} size="large" color="purple" /> :
                    <FlatList
                        data={ListSurahSource}
                        keyExtractor={item => item.nomor.toString()}
                        ListHeaderComponent={<Home />}
                        renderItem={({ item }) => (
                            <ListItemRender isi={item} />
                        )}
                        initialNumToRender={1}
                    />
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    containerRow: {
        flexDirection: 'row'
    },
    number: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    surahRow: {
        display: 'flex',
        flex: 4,
    },
    surah: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    surahDetail: {
        textTransform: 'uppercase',
        color: '#555'
    },
    arabic: {
        flex: 2,
        color: '#512DA8',
        fontSize: 28,
        textAlignVertical: "center",
        marginRight: 25
    },
    containerHome: {
        padding: 25,
        backgroundColor: 'white'
    },
    salam: {
        fontSize: 20,
        color: '#666'
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 5
    },
    lastReadContainer: {
        borderRadius: 20,
        marginVertical: 25,
    },
    lastSurahImage: {
        width: '100%',
        height: 160,
        borderRadius: 12,
    },
    lastReadContainerText: {
        padding: 20,
        position: 'absolute'
    },
    lastReadRow: {
        flexDirection: 'row',
    },
    icon: {
        width: 26,
        height: 26,
        marginRight: 10
    },
    lastReadText: {
        color: 'white',
        fontSize: 19

    },
    surahTerakhir: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 24,

    },
    ayah: {
        color: 'white',
        marginTop: 10,
        fontSize: 15,
        color: '#eee'

    }
})

const mapStateToProps = (nilai) => {
    return {
        ayatTerakhir: nilai.ayatTerakhir
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ayatTerakhirHandle: (terima) => {
            dispatch({ type: "USER_INPUT", payload: terima })
            console.log("dispatch", terima);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSurah)
