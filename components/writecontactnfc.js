import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, FlatList, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import NfcManager, { NfcEvents, NfcTech, Ndef } from 'react-native-nfc-manager';
import RNFS from 'react-native-fs';
import axios from 'axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function AddUser() {

    const baseUrl = "https://5b1f-102-216-201-33.ngrok-free.app"

    const [isLoading, setIsLoading] = useState(false);
    const [persons, setPersons] = useState({

    })

    const [firstname, setFirstName] = useState('')
    const [lastname, setLasttName] = useState('')
    const [organisation, setOrgansation] = useState('')
    const [position, setPostion] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [urls, setUrls] = useState([{ label: '', link: '' }]);

    const pressButtonHandler = () => {
        pressAddUserButtonHandler({firstname: firstname, lastname: lastname, phone: phone, email: email, organisation: organisation, position: position, urls: urls})
        
    }

    const handleAddUrl = () => {
        setUrls([...urls, { label: '', link: '' }]);
      };

      const handleDeleteUrl = (index) => {
        urls.splice(index, 1)
        setUrls([...urls]);
      };
    
    const handleChangeUrl = (index, field, value) => {
        const updatedUrls = [...urls];
        updatedUrls[index][field] = value;
        setUrls(updatedUrls);
    };

    const firstnameChangeHandler = (val) => {
        console.log(val)
        setFirstName(val)
        

    };

    const lastnameChangeHandler = (val) => {
        console.log(val)
        setLasttName(val)
    };

    const orgChangeHandler = (val) => {
        console.log(val)
        setOrgansation(val)
    };

    const positionChangeHandler = (val) => {
        console.log(val)
        setPostion(val)
    };

    const phoneChangeHandler = (val) => {
        console.log(val)
        setPhone(val)
    };

    const emailChangeHandler = (val) => {
        console.log(val)
        setEmail(val)
    };

    const pressAddUserButtonHandler = () => {
        console.log('in')

        setPersons(() => {
           
            setPersons({firstname: firstname, lastname: lastname, phone: phone, email: email, organisation: organisation, position: position, urls: urls});
            console.log(persons)
            s = createUserVcard()
            if (s === true) {
                console.log('fin')
                setFirstName('')
                setLasttName('')
                setPhone('')
                setEmail('')
                setOrgansation('')
                position('')
                setUrls([{ label: '', link: '' }]);

            } else {
                console.log('not')
            }
            
           
        })
    
      };


      const createUserVcard = async() => {
        let result = false

        setIsLoading(true);

        try {
            const response = await axios.post(`${baseUrl}/vcf/vcf-user-info/`, {first_name: firstname, last_name: lastname, email: email, phone: phone, organisation: organisation, position: position, links: urls});
      
            if (response.status === 201) {
              alert(` You have created: ${JSON.stringify(response.data.data)}`);
              setIsLoading(false);
              result = true
              console.log(result)
            } else {
             console.log(response.data)                
              throw new Error("An error occurred");
            }
          } catch (error) {
            console.log(error)
            alert("An error has occurred");
            setIsLoading(false);
          }
          return result

      }

    return (
        <ScrollView>
        <KeyboardAwareScrollView contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }}>
        
            <Text style={styles.inputLabel}>first name</Text>
            <TextInput
            style={styles.input}
            value={firstname}
            placeholder='enter first name'
            onChangeText={firstnameChangeHandler}
            />

            <Text style={styles.inputLabel}>last name</Text>
            <TextInput
            style={styles.input}
            value={lastname}
            placeholder='enter last name'
            onChangeText={lastnameChangeHandler}
            />

            <Text style={styles.inputLabel}>phone</Text>
            <TextInput
            style={styles.input}
            value={phone}
            placeholder='enter user phone'
            onChangeText={phoneChangeHandler}
            />

            <Text style={styles.inputLabel}>email</Text>
            <TextInput
            style={styles.input}
            value={email}
            placeholder='enter email'
            onChangeText={emailChangeHandler}
            />

            <Text style={styles.inputLabel}>organisation</Text>
            <TextInput
            style={styles.input}
            value={organisation}
            placeholder='enter user organisation'
            onChangeText={orgChangeHandler}
            />

            <Text style={styles.inputLabel}>position</Text>
            <TextInput
            style={styles.input}
            value={position}
            placeholder='enter user position'
            onChangeText={positionChangeHandler}
            />
            {urls.map((url, index) => (
            <View key={index} style={styles.inputContainer}>
            <Text style={styles.inputLabel}>URL site</Text>
            <TextInput
                style={styles.urlinput}
                placeholder="Label"
                value={url.label}
                onChangeText={text => handleChangeUrl(index, 'label', text)}
            />
            <Text style={styles.inputLabel}>URL</Text>
            <TextInput
                style={styles.urlinput}
                placeholder="Link"
                value={url.link}
                onChangeText={text => handleChangeUrl(index, 'link', text)}
            />
            <Button title="delete" onPress={() => handleDeleteUrl(index)} />
            </View>
        ))}
            
            <Button title="Add URL" onPress={handleAddUrl} />
            <Button onPress={pressButtonHandler} title='submit info' />
        
        </KeyboardAwareScrollView>
        </ScrollView>
        
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

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    urlinput: {
        borderColor: 'black',
        padding: 8,
        width: 75,
        margin: 10,
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 8,
    },
   
  });
  