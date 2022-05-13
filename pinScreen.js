import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import {StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextAncestorContext from "react-native-web/dist/exports/Text/TextAncestorContext";

const pinScreen = ({ navigation }) => {
    const [user, setuser] = useState([]);
    // const [data, setdata] = useState([]);
    let pin = [];
    var trys = 4;
    if (user == '' || user === null) {
        AsyncStorage.getItem('user', (err, result) => {
            const r = JSON.parse(result);
            setuser(r);
        });
        // AsyncStorage.getItem('data', (err, result) => {
        //     const r = JSON.parse(result);
        //     setdata(r);
        // });
    }

    const click = (n) => {
        // var n = props.name;

        if(trys == 0) {
            AsyncStorage.setItem("token", '');
            navigation.navigate("Login");
        }

        pin.push(n);
        if(pin.length > 3) {
            var PIN = pin[0]+""+pin[1]+""+pin[2]+""+pin[3];
            // console.log(user);
            if(user.PIN === null || user.PIN == ""){
                AsyncStorage.getItem('token', (err, result) => {
                    // console.log(PIN);
                    var request = new XMLHttpRequest();
                    request.onreadystatechange = (e) => {
                    };
                    request.open('GET', 'https://wwapp.joeypfoster.nl/?token='+result+'&pin='+PIN);
                    request.send();
                });
                pin = [];
                trys = 4;
                navigation.replace("Home");
            }else if(pin[0] == user.PIN[0] && pin[1] == user.PIN[1] && pin[2] == user.PIN[2] && pin[3] == user.PIN[3]) {
                navigation.replace("Home");
                pin = [];
                trys = 4;
            } else {
                trys--;
                pin = [];
                alert("trys:"+trys);
            }
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.info}>Enter your Pin code you have 4 trys total</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => click(1)} ><Text>1</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => click(2)} ><Text>2</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => click(3)} ><Text>3</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => click(4)} ><Text>4</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => click(5)} ><Text>5</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => click(6)} ><Text>6</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => click(7)} ><Text>7</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => click(8)} ><Text>8</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => click(9)} ><Text>9</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => click(0)} ><Text>0</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    info: {
      marginTop: -100,
      fontWeight: "bold",
      fontSize: 15,
    },
    buttons: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    button: {
        backgroundColor: "white",
        height: 60,
        width: 60,
        borderRadius: 60,
        borderStyle: "solid",
        borderWidth: 5,
        borderColor: "black",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        marginLeft: 25,
        marginRight: 25,
    }
});

export default pinScreen;