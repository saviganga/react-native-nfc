// import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { Button, StyleSheet, Text, TextInput, FlatList, View, SafeAreaView, TouchableOpacity, cancelReadTag, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import NfcManager, { NfcEvents, NfcTech, Ndef } from 'react-native-nfc-manager';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import WriteNfc from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/writenfc';
import ReadNfc from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/readnfc';
import HomeScreen from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/home';
import AddUser from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/writecontactnfc';
import WriteToVcard from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/writevcard';
import LoginSignupPage from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/xauth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



export default function Settings( { onLogout } ) {


    const logout = () => {
        onLogout()
    }



return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={false} resetScrollToCoords={{ x: 0, y: 0 }}>
      {/* <View> */}
          <Button onPress={logout} title='logout' />

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

