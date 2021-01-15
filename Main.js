// @refresh state
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, Image, Button, Easing } from 'react-native';
import * as SMS from 'expo-sms';
import * as firebase from 'firebase';
import 'firebase/firestore';
 
import piano from './images/piano.png';
import food from './images/food.png';
import hammer from './images/hammer.png';
import buttcheeck from './images/buttcheeck.png';
import present from './images/present.png';
import orange from './images/orange.png';

var firebaseConfig = {
  apiKey: "AIzaSyAEF7ewZBu73uVCYvZcVeck5--v2ZY5UCk",
  authDomain: "ashleybday-b2415.firebaseapp.com",
  projectId: "ashleybday-b2415",
  storageBucket: "ashleybday-b2415.appspot.com",
  messagingSenderId: "599684723916",
  appId: "1:599684723916:web:2afccb9dde330bbb417e69"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const countRef = db.collection('counts');

export default function MainScreen() {

  const [songNum, songNumCount] = useState(0);
  const [cookNum, cookNumCount] = useState(0);
  const [buildNum, buildNumCount] = useState(0);
  const [slapNum, slapNumCount] = useState(0);
  const [presentNum, presentNumCount] = useState(0);
  const [etsyNum, etsyNumCount] = useState(0);

  useEffect(() => {
    countRef.doc('sDho66QybdbhJOYdN7kE').get().then(doc => {
      let d = doc.data();
      songNumCount(d.songCount);
      cookNumCount(d.cookCount);
      buildNumCount(d.buildCount);
      presentNumCount(d.presentCount);
      slapNumCount(d.slapCount);
      etsyNumCount(d.etsyCount);
    })
  })

  const sendMusicSMS = async () => {
    await SMS.sendSMSAsync(
      '9497357649',
      'yo bich can you play me a song?'
    )
    .then(() => {
      songNumCount(songNum+1);

      countRef.doc('sDho66QybdbhJOYdN7kE').update({
        songCount: songNum+1,
      });
    });
  }

  const sendCookSMS = async () => {
    await SMS.sendSMSAsync(
      '9497357649',
      'yo hoe, im hungry'
    )
    .then(() => {
      cookNumCount(cookNum+1);
      countRef.doc('sDho66QybdbhJOYdN7kE').update({
        cookCount: cookNum+1
      });
    })
  }

  const incSlapCount = () => {
    slapNumCount(slapNum+1);
    countRef.doc('sDho66QybdbhJOYdN7kE').update({
      slapCount: slapNum+1
    });
  }

  const incPresentCount = () => {
    presentNumCount(presentNum+1);
    countRef.doc('sDho66QybdbhJOYdN7kE').update({
      presentCount: presentNum+1
    });
  }

  const sendMakeSMS = async () => {
    await SMS.sendSMSAsync(
      '9497357649',
      'dude can u be useful and make something already'
    )
    .then(() => {
      buildNumCount(buildNum+1);
      countRef.doc('sDho66QybdbhJOYdN7kE').update({
        buildCount: buildNum+1
      });
    })
  }

  const sendEtsySMS = async () => {
    await SMS.sendSMSAsync(
      '9497357649',
      'lmao buy me this please - https://www.etsy.com/shop/ForSaintClements'
    )
    .then(() => {
      buildNumCount(etsyNum+1);
      countRef.doc('sDho66QybdbhJOYdN7kE').update({
        etsyCount: etsyNum+1
      });
    })
  }

  

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, textAlign: 'center', marginBottom: 30, fontFamily: 'AvenirNext-Medium'}}>KOTA FREE ENTERTAINMENT PASS (expires next year)</Text>
      <View style={styles.flexrow_container}>
          <View style={songNum !== 3 ? styles.cell : styles.disabled}>
            <Image 
              style={styles.image}
              source={piano}/>
            <Text style={{fontFamily: 'AvenirNext-Medium'}} onPress={() => songNum !== 3 ? sendMusicSMS() : null}>kota play some music for u ({songNum}/3)</Text>
          </View>
          <View style={cookNum !== 5 ? styles.cell : styles.disabled}>
            <Image 
              style={styles.image}
              source={food}/>
            <Text style={{fontFamily: 'AvenirNext-Medium'}} onPress={() => cookNum !== 5 ? sendCookSMS() : null}>kota will cook nice things ({cookNum}/5)</Text>
          </View>
      </View>

      <View style={styles.flexrow_container}>
          <View style={buildNum !== 1 ? styles.cell : styles.disabled}>
            <Image 
              style={styles.image}
              source={hammer}/>
            <Text style={{fontFamily: 'AvenirNext-Medium'}} onPress={() => buildNum !== 1 ? sendMakeSMS() : null}>kota will make u something ({buildNum}/1)</Text>
          </View>
          <View style={styles.cell}>
            <Image 
              style={styles.image}
              source={buttcheeck}/>
            <Text style={{fontFamily: 'AvenirNext-Medium'}} onPress={() => incSlapCount()}>kota will let u slap his butt ({slapNum}/0)</Text>
          </View>
      </View>

      <View style={styles.flexrow_container}>
        <View style={presentNum !== 1 ? styles.cell : styles.disabled}>
          <Image 
            style={styles.image}
            source={present}/>
          <Text style={{fontFamily: 'AvenirNext-Medium'}} onPress={() => presentNum !== 1 ? incPresentCount() : null}>redeem to open today's gift ({presentNum}/1)</Text>
        </View>
        <View style={etsyNum !== 1 ? styles.cell : styles.disabled}>
          <Image 
            style={styles.image}
            source={orange}/>
          <Text style={{fontFamily: 'AvenirNext-Medium'}} onPress={() => etsyNum !== 1 ? sendEtsySMS() : null}>order orange thing ({etsyNum}/1)</Text>
        </View>
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#D3C2FD',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexrow_container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    backgroundColor: "#fff",
    height: 155, 
    width: 155,
    margin: 5,
    borderRadius: 30,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabled: {
    backgroundColor: '#EDB3B3',
    height: 155, 
    width: 155,
    margin: 5,
    borderRadius: 30,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    maxWidth: 80,
    maxHeight: 80
  }
});