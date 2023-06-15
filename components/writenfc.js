// import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, FlatList, View, SafeAreaView, TouchableOpacity, cancelReadTag } from 'react-native';
import React, { useState, useEffect } from 'react';
import NfcManager, { NfcEvents, NfcTech, Ndef } from 'react-native-nfc-manager';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function WriteNfc() {

    // initialize a state with the initial value of the nfc tag
    const [link, setLink] = useState('')

    // create a handler for when the user inputs a link
    const linkChangeHandler = (val) => {
        console.log(val)
        setLink(val)
    };

    // handler for when the user submits the link
    const pressButtonHandler = () => {
        console.log(link)
        writeNFC(link)
    }


  const writeNFC = async(val) => {
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.uriRecord(val)]);

      if (bytes) {
        await NfcManager.ndefHandler
          .writeNdefMessage(bytes);
        result = true;
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }

    // return the input and button
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={false} resetScrollToCoords={{ x: 0, y: 0 }}>
        {/* <View> */}
            <Text style={styles.inputLabel}>Enter url to copy to nfc card</Text>
            <TextInput
            style={styles.input}
            placeholder='enter link'
            onChangeText={linkChangeHandler}
            />

            <Button onPress={pressButtonHandler} title='submit info' />

        {/* </View> */}
        </KeyboardAwareScrollView>
    )
}



const styles = StyleSheet.create({
  
    input: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 8,
      margin: 10,
      width: 200
    },

    inputLabel: {
      marginBottom: -1,
      marginStart: 15,
      marginTop: 10
      
    },

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      },
   
  });
  