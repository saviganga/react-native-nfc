import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, FlatList, View } from 'react-native';
import React, { useState } from 'react';



export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.input}>Hello Nigga</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    // header: {
    //     height: 250,
    //     width: 1000,
    //     paddingTop: 38,
    //     backgroundColor: 'coral'
    // },
    input: {
        marginTop: 300,
        padding: 50,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 50
    }
});