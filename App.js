import { StatusBar } from 'expo-status-bar';
import React, {useState, Component, useEffect} from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import register from './register';
import Login from "./login";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import pinScreen from "./pinScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from "./Home";
import { MenuProvider } from 'react-native-popup-menu';
import AddApp from "./AddApp";


const Stack = createNativeStackNavigator();

export default function App({navigation}) {
    let startscreen = 'Login';
    console.disableYellowBox = true;
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={startscreen} >
          <Stack.Screen name="Login" component={Login} options={{headerBackVisible:false}} />
          <Stack.Screen name="Register" component={register} />
            <Stack.Screen name="pinScreen" component={pinScreen} options={{headerBackVisible:false}}/>
            <Stack.Screen name="Home" component={Home} options={{headerBackVisible:false}}/>
            <Stack.Screen name="AddApp" component={AddApp} options={{headerBackVisible:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}
