import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, FlatList, View } from 'react-native';
import React, { useState } from 'react';
import NfcManager, { NfcEvents, NfcTech, Ndef } from 'react-native-nfc-manager';
import RNFS from 'react-native-fs';
import axios from 'axios'


export default function AddUser() {

    const baseUrl = "https://5b1f-102-216-201-33.ngrok-free.app"

    const [isLoading, setIsLoading] = useState(false);
    const [persons, setPersons] = useState({

    })

    const [firstname, setFirstName] = useState('')
    const [lastname, setLasttName] = useState('')
    const [organisation, setOrgansation] = useState(0)
    const [position, setPostion] = useState(0)
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const pressButtonHandler = () => {
        pressAddUserButtonHandler({firstname: firstname, lastname: lastname, phone: phone, email: email, organisation: organisation, position: position})
        
    }

    const firstnameChangeHandler = (val) => {
        console.log(val)
        setFirstName(val)

    };

    const lastnameChangeHandler = (val) => {
        console.log(val)
        setLasttName(val)
    };

    const orgChangeHandler = (val) => {
        console.log(val)
        setOrgansation(val)
    };

    const positionChangeHandler = (val) => {
        console.log(val)
        setPostion(val)
    };

    const phoneChangeHandler = (val) => {
        console.log(val)
        setPhone(val)
    };

    const emailChangeHandler = (val) => {
        console.log(val)
        setEmail(val)
    };

    const pressAddUserButtonHandler = () => {
        console.log('in')

        setPersons(() => {
           
            setPersons({firstname: firstname, lastname: lastname, phone: phone, email: email, organisation: organisation, position: position});
            console.log(persons)
            createUserVcard()
           
        })
    
      };


      const createUserVcard = async() => {
        let result = false

        setIsLoading(true);
        const payload = persons

        try {
            const response = await axios.post(`${baseUrl}/vcf/vcf-user-info/`, payload);
      
            if (response.status === 201) {
              alert(` You have created: ${JSON.stringify(response.data.data)}`);
              setIsLoading(false);
              result = true
              console.log(result)
            } else {
             console.log(response.data)                
              throw new Error("An error occurred");
            }
          } catch (error) {
            console.log(error)
            alert("An error has occurred");
            setIsLoading(false);
          }

          return result

      }

    return (
        <View>
            <TextInput
            style={styles.input}
            placeholder='enter first name'
            onChangeText={firstnameChangeHandler}
            />

            <TextInput
            style={styles.input}
            placeholder='enter last name'
            onChangeText={lastnameChangeHandler}
            />

            <TextInput
            style={styles.input}
            placeholder='enter user phone'
            onChangeText={phoneChangeHandler}
            />

            <TextInput
            style={styles.input}
            placeholder='enter email'
            onChangeText={emailChangeHandler}
            />

            <TextInput
            style={styles.input}
            placeholder='enter user organisation'
            onChangeText={orgChangeHandler}
            />

            <TextInput
            style={styles.input}
            placeholder='enter user position'
            onChangeText={positionChangeHandler}
            />

            <Button onPress={pressButtonHandler} title='submit info' />

        </View>
    )

};

const styles = StyleSheet.create({
  
    input: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 8,
      margin: 10,
      width: 200
    },
   
  });
  