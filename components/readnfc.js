// import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, FlatList, View, SafeAreaView, TouchableOpacity, cancelReadTag, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import NfcManager, { NfcEvents, NfcTech, Ndef } from 'react-native-nfc-manager';


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
        <SafeAreaView style={styles.sectionContainer}>
          <TouchableOpacity style={styles.input} onPress={readTag}>
            <Text style={{ color: "white" }}>Scan Tag</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );


}

const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: 'white',
      padding: 8,
      margin: 10,
      width: 200
    },
    content: {
      padding: 40
    },
    list: {
      marginTop: 20
    }
  });
  

  