// Homescreen.js
import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView } from "react-native";
import NfcManager, { NfcEvents, NfcTech, Ndef } from 'react-native-nfc-manager';
import WriteNfc from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/writenfc';
import ReadNfc from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/readnfc';


export default function HomeScreen({ navigation }) {

    const [hasNfc, setHasNFC ] = useState(null);

    useEffect(() => {
        const checkIsSupported = async () => {
        const deviceIsSupported = await NfcManager.isSupported()

        setHasNFC(deviceIsSupported)
        if (deviceIsSupported) {
            await NfcManager.start()
        }
        }

        checkIsSupported()

        return () => {
        NfcManager.unregisterTagEvent();
        };
    }, [])

    useEffect(() => {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
        console.log('tag found')
        // console.log(tag)
        })


        return () => {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        }
    }, [])

    return (
        <SafeAreaView style={styles.sectionContainer}>
        
        <ReadNfc/>

        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
},
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


