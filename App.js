// import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, FlatList, View, SafeAreaView, TouchableOpacity, cancelReadTag } from 'react-native';
import React, { useState, useEffect } from 'react';
import NfcManager, { NfcEvents, NfcTech, Ndef } from 'react-native-nfc-manager';


import Header from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/header';
import UserItem from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/useritem';
import AddUser from '/Users/saviganga/Documents/working-boy/nfc/rnative/nfc/components/adduser';





export default function App() {
  
  const keyCount = 0;
  const [persons, setPersons] = useState([
    
  ]);

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
  }, [])

  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.log('tag found')
      console.log(tag)
    })

    // NfcManager.setEventListener(NfcEvents.DiscoverTag, null);

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    }
  }, [])


  // const readTag = async () => {
  //   await NfcManager.registerTagEvent();
  // }

  // if (hasNfc === null) return null;

  // if (!hasNfc) {
  //   return (
  //     <View style={styles.sectionContainer}>
  //       <Text>NFC not supported</Text>
  //     </View>
  //   )
  // }

  // const readTag = async function readMifare() {
  //   let mifarePages = [];
  
  //   try {
  //     // STEP 1
  //     let reqMifare = await NfcManager.requestTechnology(
  //       NfcTech.MifareUltralight,
  //     );
  
  //     const readLength = 60;
  //     const mifarePagesRead = await Promise.all(
  //       [...Array(readLength).keys()].map(async (_, i) => {
  //         const pages = await NfcManager.mifareUltralightHandlerAndroid // STEP 2
  //           .mifareUltralightReadPages(i * 4); // STEP 3
  //         mifarePages.push(pages);
  //       }),
  //     );
  //   } catch (ex) {
  //     console.warn(ex);
  //   } finally {
  //     // STEP 4
  //     NfcManager.cancelTechnologyRequest();
  //   }

    // console.log(mifarePages);
  
  //   return mifarePages;
  // }

  const writeNFC = async() => {
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.uriRecord('https://www.youtube.com/results?search_query=wizkid+more+love+less+ego+album')]);

      if (bytes) {
        await NfcManager.ndefHandler
          .writeNdefMessage(bytes);
        result = true;
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }


    // _cleanUp = () => {
    //   NfcManager.cancelTechnologyRequest().catch(() => 0);
    //   }
    //   _testNdef = async (textToWrite) => {
    //   try {
    //   let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
    //   alertMessage: 'Ready to write some NFC tags!'
    //   });
    //   console.warn(resp);
    //   let ndef = await NfcManager.getNdefMessage();
    //   console.warn(ndef);
    //   let bytes = buildUrlPayload(textToWrite);
    //   await NfcManager.writeNdefMessage(bytes);
    //   console.warn('successfully write ndef');
    //   await NfcManager.setAlertMessageIOS('Your tag is now linked!');
    //   this._cleanUp();
    //   } catch (ex) {
    //   console.warn('ex', ex);
    //   this._cleanUp();
    //   }
    //   }
      
      











    return result;
  }

  const readTag = async() => {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
        console.warn('Tag found:', Ndef.uri.decodePayload(tag.ndefMessage[0].payload));
    }
      // console.warn('Tag found', tag, Ndef.uri.decodePayload(tag.ndefMessage[0].payload));
      // return Ndef.uri.decodePayload(tag.ndefMessage[0].payload);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

//   return (
//     <View style={styles.wrapper}>
//       <TouchableOpacity onPress={readNdef}>
//         <Text>Scan a Tag</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text>Hello world</Text>
      <TouchableOpacity style={styles.input} onPress={readTag}>
        <Text style={{ color: "white" }}>Scan Tag</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input} onPress={writeNFC}>
        <Text style={{ color: "white" }}>Write Tag</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input} onPress={cancelReadTag}>
        <Text style={{ color: "white" }}>Cancel Scan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );















  // const pressItemHandler = (key) => {
  //   setPersons((prevPersons) => {
  //     return prevPersons.filter(person => person.key != key);
  //   })
  // };

  // const pressAddUserButtonHandler = (obj) => {

  //   setPersons((prevPersons) => {
  //      return [
  //       {key: Math.random().toString(), name: obj.name, age: obj.age},
  //       ...prevPersons
  //      ]
  //   })

  // };

  // return (
  //   <View style={styles.container}>
  //     {/* <StatusBar style="auto" /> */}

  //     <Header />

  //     <View style={styles.content}>
  //       {/* form to hold user info */}

  //       <AddUser pressAddUserButtonHandler={pressAddUserButtonHandler} />

  //       <View style={styles.list}>
  //         <FlatList
  //         data={persons}
  //         renderItem={({ item }) => (
  //           <UserItem item={item} pressItemHandler={pressItemHandler} />
  //         )}
  //         />
  //       </View>

  //     </View>

  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
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
