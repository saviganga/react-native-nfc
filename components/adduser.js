import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, FlatList, View } from 'react-native';
import React, { useState } from 'react';


export default function AddUser({ pressAddUserButtonHandler }) {

    const [name, setName] = useState('')
    const [age, setAge] = useState(0)

    const pressButtonHandler = () => {
        pressAddUserButtonHandler({name: name, age: age})
    }

    const nameChangeHandler = (val) => {
        setName(val)
    };

    const ageChangeHandler = (val) => {
        setAge(val)
    };

    return (
        <View>
            <TextInput
            style={styles.input}
            placeholder='enter user name'
            onChangeText={nameChangeHandler}
            />

            <TextInput
            style={styles.input}
            placeholder='enter user age'
            onChangeText={ageChangeHandler}
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
  