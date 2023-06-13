import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, FlatList, View } from 'react-native';
import React, { useState } from 'react';
import NfcManager, { NfcEvents, NfcTech, Ndef } from 'react-native-nfc-manager';
import RNFS from 'react-native-fs';
import axios from 'axios'


export default function WriteToVcard() {

    const baseUrl = "https://be61-102-216-201-44.ngrok-free.app"

    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false);


    const emailChangeHandler = (val) => {
        console.log(val)
        setEmail(val)
    };

    const pressButtonHandler = () => {
        getVcardUrl()
        
    }


    const getVcardUrl = async() => {
        let result = false

        setIsLoading(true);
        const payload = {email: email}
        console.log(payload)

        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const response = await axios.post(`${baseUrl}/vcf/vcf-user-info/get_signed_vcf_url/`, payload);
      
            if (response.status === 200) {
              alert(` You have created: ${JSON.stringify(response.data.data)}`);
              setIsLoading(false);
              const bytes = Ndef.encodeMessage([Ndef.uriRecord(response.data.data)]);
              if (bytes) {
                console.log('bytes')
                await NfcManager.ndefHandler
                  .writeNdefMessage(bytes);
                result = true;
              }
              console.log(result)
            } else {
             console.log(response.data)                
              throw new Error("An error occurred");
            }
          } catch (error) {
            console.log(error)
            alert("An error has occurred");
            setIsLoading(false);
          } finally {
            NfcManager.cancelTechnologyRequest();
          }

          return result

      }

    return (
        <View>

            <TextInput
            style={styles.input}
            placeholder='enter email'
            onChangeText={emailChangeHandler}
            />

            <Button onPress={pressButtonHandler} title='submit info' />

        </View>
    )

};

const styles = StyleSheet.create({
  
    input: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 8,
      margin: 10,
      width: 200
    },
   
  });
  


