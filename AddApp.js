import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddApp = ({ navigation }) =>  {
    const [Name, setName] = useState("");
    const [Mail, setMail] = useState("");
    const [Password, setPassword] = useState("");
    const [User, setUser] = useState("");

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (<Button title="<--" onPress={() => navigation.replace("Home")} />
            ),
        });
    }, [navigation]);

    const AddApp = () => {
        AsyncStorage.getItem('user', (err, result) => {
            const r = JSON.parse(result);
            if (Name != '' && Mail != '' && Password != '') {
                var request = new XMLHttpRequest();
                request.onreadystatechange = (e) => {
                    if (request.readyState !== 4) {
                        return;
                    }

                    if (request.status === 200) {
                        var data = JSON.parse(request.responseText);
                        // console.log(data);
                        if(data.error != null) {
                            alert(data.error);
                        } else if(data.data != null) {
                            alert("app has been added");
                            AsyncStorage.setItem("data", JSON.stringify(data.data));
                            navigation.replace("Home");
                        } else {
                            alert("there is something wrong with the servers");
                        }
                    } else {
                        // console.warn('error');
                    }
                };
                request.open('GET', 'https://wwapp.joeypfoster.nl/?appMail='+Mail+'&appPassword='+Password+'&appName='+Name+'&ID='+r.ID);
                request.send();
            }else {
                alert("you need to fill in all fields");
            }
        });


    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Name" onChangeText={(Name) => setName(Name)}/>
            <TextInput style={styles.input} placeholder="Mail" onChangeText={(Mail) => setMail(Mail)}/>
            <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={(Password) => setPassword(Password)}/>
            <View style={styles.buttons}>
                <Button style={styles.AddBTN} onPress={AddApp} title="Add App"/>
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

    input: {
        height: 30,
        width: 200,
    },

    buttons: {
        height: 40,
        width: 90,
    },

});

export default AddApp;