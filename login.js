import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) =>  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    AsyncStorage.getItem('token',(err, result) => {
        // console.log(result, err);
        if(result != null) {
            // navigation.navigate("pin");
            var request = new XMLHttpRequest();
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    var data = JSON.parse(request.responseText);
                    // console.log(data);
                    if (data != null && !data.error) {
                        // console.log(data);
                        AsyncStorage.setItem("user", JSON.stringify(data.user));
                        AsyncStorage.setItem("data", JSON.stringify(data.data));
                        navigation.navigate("pinScreen");
                    } else {
                        AsyncStorage.setItem("token", null);
                    }
                } else {
                    // console.warn('error');
                }
            };
            request.open('GET', 'https://wwapp.joeypfoster.nl/?token='+result);
            request.send();
        } else {
            // console.log("data reset");
            AsyncStorage.setItem("user", null);
            AsyncStorage.setItem("data", null);
        }
    });


  const login = () => {
      // console.log(email, password);
      var Request = new XMLHttpRequest();
      Request.onreadystatechange = (e) => {
        if (Request.readyState !== 4) {
          return;
        }

        if (Request.status === 200) {
          var data = JSON.parse(Request.responseText);
          if(data.token !== null && !data.error){
             AsyncStorage.setItem("token", data.token);
             // AsyncStorage.setItem("user", JSON.stringify(data.user));
             // AsyncStorage.setItem("data", JSON.stringify(data.data));
             navigation.navigate("pinScreen");
          }else {
            alert(data.error);
          }
        } else {
          // console.warn('error');
        }
      };
      Request.open('GET', 'https://wwapp.joeypfoster.nl/?mail='+email+'&password='+password);
      Request.send();

  }

  return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Email" onChangeText={(email) => setEmail(email)}/>
        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={(password) => setPassword(password)}/>
        <Button style={styles.loginbtn} onPress={() => login()} title="Login"/>
          <View style={styles.registerbtn}>
              <Button  onPress={() => navigation.navigate("Register")} title="Register"/>
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

export default Login;