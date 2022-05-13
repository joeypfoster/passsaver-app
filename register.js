import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import {StyleSheet, Text, View, Button, TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const register = ({ navigation }) => {
  const [Rname, setRname] = useState("");
  const [Remail, setREmail] = useState("");
  const [Rpassword, setRPassword] = useState("");


  const register = () => {
    if (Rname != '' && Remail != '' && Rpassword != '') {
      var token = '';
      var request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          var data = JSON.parse(request.responseText);
          if (data.token !== null && !data.error) {
            token = data.token;
            AsyncStorage.setItem("token", data.token);
          } else {
            alert(data.error);
          }
        } else {
          // console.warn('error');
        }
      };
      request.open('GET', 'https://wwapp.joeypfoster.nl/?mail=' + Remail + '&password=' + Rpassword + '&name=' + Rname);
      request.send();

      var Request = new XMLHttpRequest();
      Request.onreadystatechange = (e) => {
        if (Request.readyState !== 4) {
          return;
        }

        if (Request.status === 200) {
          var data = JSON.parse(Request.responseText);
            AsyncStorage.setItem("user", JSON.stringify(data.user));
            AsyncStorage.setItem("data", JSON.stringify(data.data));
            navigation.navigate("pinScreen");
        } else {
          // console.warn('error');
        }
      };
      Request.open('GET', 'https://wwapp.joeypfoster.nl/?token='+token);
      Request.send();



    } else {
      alert("you need to fill in all fields!");
    }
  }

  return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="User Name" onChangeText={(Rname) => setRname(Rname)}/>
        <TextInput style={styles.input} placeholder="Email" onChangeText={(Remail) => setREmail(Remail)}/>
        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={(Rpassword) => setRPassword(Rpassword)}/>
        <Button style={styles.loginbtn} onPress={register} title="create acc"/>
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

  loginbtn: {
    height: 30,
    width: 70,
    borderRadius: 10,
  },

  registerbtn: {
    position: "absolute",
    bottom: 100,
  },
});


export default register;