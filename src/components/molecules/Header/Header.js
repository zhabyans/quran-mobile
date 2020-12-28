import React, { useEffect, useState, PureComponent } from 'react'
import { Text, View, Image, StyleSheet, ActivityIndicator, FlatList, Button } from 'react-native'
import Axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

const Header = (props) => {
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

export default Header