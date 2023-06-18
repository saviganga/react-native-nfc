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


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth">
            {(props) => <LoginSignupPage {...props} onLogin={() => setIsAuthenticated(true)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name=" ">
            {() => (
              <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="write url" component={WriteNfc} />
                <Tab.Screen name="create contact" component={AddUser} />
                <Tab.Screen name="write vcard" component={WriteToVcard} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );

  
};
