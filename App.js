// import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, FlatList, View, SafeAreaView, TouchableOpacity, cancelReadTag, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import NfcManager, { NfcEvents, NfcTech, Ndef } from 'react-native-nfc-manager';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WriteNfc from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/writenfc';
import ReadNfc from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/readnfc';
import HomeScreen from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/home';
import AddUser from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/writecontactnfc';
import WriteToVcard from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/writevcard';

// const Stack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="write URL" component={WriteNfc} />
        <Tab.Screen name="create contact" component={AddUser} />
        <Tab.Screen name="write vcard" component={WriteToVcard} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}
