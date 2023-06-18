// import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, FlatList, View, SafeAreaView, TouchableOpacity, cancelReadTag, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import NfcManager, { NfcEvents, NfcTech, Ndef } from 'react-native-nfc-manager';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function ReadNfc() {

    const readTag = async() => {
        try {
          // register for the NFC tag with NDEF in it
          await NfcManager.requestTechnology(NfcTech.Ndef);
          // the resolved tag object will contain `ndefMessage` property
          const tag = await NfcManager.getTag();
          if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
            Alert.alert('Tag found:', Ndef.uri.decodePayload(tag.ndefMessage[0].payload));
        }
        } catch (ex) {
          console.warn('Oops!', ex);
        } finally {
          // stop the nfc scanning
          NfcManager.cancelTechnologyRequest();
        }
      }

      return (
        <View style={styles.container}>
          
          <TouchableOpacity style={styles.input} onPress={readTag}>
            <Text style={{ color: "black" }}>Scan Tag</Text>
          </TouchableOpacity>
          
        </View>
      );


}

const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      margin: 10,
      width: 200,
      height: 50
    },
    content: {
      padding: 40
    },
    list: {
      marginTop: 20
    },
    container: {
      flex: 1,
      marginTop: 250,
      justifyContent: 'center',
      alignItems: 'center',
      },
    
  });
  

  