import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, DetailSurah, ListSurah, SettingPage } from '../pages';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen name='ListSurah' component={ListSurah} options={{ headerShown: false }} />
        <HomeStack.Screen name='DetailSurah' component={DetailSurah} options={({ route }) => ({ title: route.params.pesan.nama_latin })} />
    </HomeStack.Navigator>
)

const SettingStackScreen = () => (
    <SettingStack.Navigator>
        <SettingStack.Screen name='SettingPage' component={SettingPage} />
    </SettingStack.Navigator>
)


export default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='ListSurah' component={HomeStackScreen} options={{ headerShown: false }} />
                <Stack.Screen name='SettingPage' component={SettingStackScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}