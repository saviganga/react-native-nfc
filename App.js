// import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, FlatList, View, SafeAreaView, TouchableOpacity, cancelReadTag, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import NfcManager, { NfcEvents, NfcTech, Ndef } from 'react-native-nfc-manager';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WriteNfc from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/writenfc';
import ReadNfc from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/readnfc';
import HomeScreen from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/home';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="hello nigga!" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
