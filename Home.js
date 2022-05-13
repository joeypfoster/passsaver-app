import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, Component} from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextAncestorContext from "react-native-web/dist/exports/Text/TextAncestorContext";
import {Menu, MenuContext, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";

const Home = ({navigation}) => {
    const [User, setUser] = useState([]);
    const [Data, setData] = useState([]);

        useEffect(() => {
            if (User == '') {
                AsyncStorage.getItem('user', (err, result) => {
                    const r = JSON.parse(result);
                    setUser(r);
                });
                AsyncStorage.getItem('data', (err, result) => {
                    const r = JSON.parse(result);
                    // console.log(r);
                    setData(r);
                });
            }
        }, [Data, User]);
        // console.log(Data);
        React.useLayoutEffect(() => {
            navigation.setOptions({
                headerRight: () => (
                    <Button onPress={() => navigation.navigate('AddApp')} title={'ADD'}/>
                ),
                headerLeft: () => (<Button title="<--" onPress={() => navigation.navigate("pinScreen")} />
                ),
            });
        }, [navigation]);

        const appDelete = (n) => {
            // console.log(n);
            var request = new XMLHttpRequest();
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    var data = JSON.parse(request.responseText);
                    // console.log(data);
                    AsyncStorage.setItem("data", JSON.stringify(data.data));
                    navigation.replace("Home");
                    alert("app has been deleted");
                } else {
                    console.warn('error');
                }
            };
            request.open('GET', 'https://wwapp.joeypfoster.nl/?appName=' + n + '&ID=' + User.ID + "&appDelete=True");
            request.send();
        }

    return (

        <View style={styles.main}>

            <ScrollView >

                <View style={styles.scroll}>

            {Data !== null && Data.map((item, key) => (

                <View key={key} style={styles.container}>
                    <Text>{item.APP}</Text>
                    <Text>{item.APPMAIL}</Text>
                    <View style={styles.buttons}>
                        <Button style={styles.button} onPress={() => alert("Password: "+item.APPPASSWORD)} title="Show password"/>
                    </View>
                    <View style={styles.buttons}>
                        <Button style={styles.button} onPress={() => appDelete(item.APP)} title="Delete app"/>
                    </View>
                </View>
                ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#fff",

    },
    scroll: {
        marginTop: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 5,
        width: 200,
        minHeight: 350,
        marginTop: 50,
    },
    buttons: {
      marginTop: 10,
    },

});
export default Home;