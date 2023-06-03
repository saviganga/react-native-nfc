import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, FlatList, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';


export default function UserItem({ item, pressItemHandler }) {
    const itemPressHandler = () => {
        return (pressItemHandler(item.key))
    }
    
    return (
        <TouchableOpacity onPress={itemPressHandler}>
            <Text style={styles.item}>{item.name} {item.age}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    // header: {
    //     height: 250,
    //     width: 1000,
    //     paddingTop: 38,
    //     backgroundColor: 'coral'
    // },
    item: {
        marginTop: 10,
        padding: 16,
        borderWidth: 1,
        borderColor: '#bbb',
        borderStyle: 'dashed',
        borderRadius: 10,
        color: 'grey', 
        // textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 40
    }
});