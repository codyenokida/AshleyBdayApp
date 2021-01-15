import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, Image, Button, Easing } from 'react-native';
import codyImage from './images/cody.png';
import TypingText from 'react-native-typing-text';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './Main.js'

function HomeScreen({ navigation }) {

  // const speeches = ['sooo its ur birthday', 'sooo its ur birthday', 'sooo its ur birthday']
  const speeches = [<View><TypingText text='uh...' color='#000' textSize={20}/></View>, 
                    <TypingText text='hi, so its your birthday?' color='#000' textSize={20}/>, 
                    <View><TypingText text='thats pretty cool' color='#000' textSize={20}/></View>, 
                    <TypingText text='i have a couple of gifts...' color='#000' textSize={20}/>,
                    <View><TypingText text='ready?' color='#000' textSize={20}/></View>,]

  

  const [speechNum, speechNumCount] = useState(0);

  const bounceAnimation = new Animated.Value(0);
  const slideUpAnimation = new Animated.Value(1);
 
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnimation, {
          toValue: 15,
          duration: 90,
          delay: 20,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnimation, {
          toValue: 0,
          duration: 60,
          useNativeDriver: true,
        })
      ]),
      {
        iterations: 4
      }
    ).start()
  })
  

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bounceContainer,
          {
            transform: [{ translateY: bounceAnimation }]
          }
        ]}
        >
        <Image 
          style={styles.image}
          source={codyImage}
        />
      </Animated.View>
      <Text style={{marginBottom: 120}}>koti</Text>

      <Animated.View
        style={styles.textSpeech}
      >
        {speeches[speechNum]}
      </Animated.View>

      <View>
        {
          speechNum > 3 ? 
          <Animated.View 
            style={[
              styles.buttonContainer,
              {
                transform: [{ translateY: slideUpAnimation }]
              }
            ]}>
            <View style={styles.noButton}><Button color='#123' title="No" onPress={() => {speechNumCount(0);}}>No</Button></View>
            <View style={styles.yesButton}><Button color='#000' title="Yes" onPress={() => navigation.navigate('MainScreen')}>Yes</Button></View>
          </Animated.View> 
          : 
          <Animated.View 
            style={[
              styles.buttonContainer,
              {
                transform: [{ translateY: slideUpAnimation }]
              }
            ]}>
            <View style={speechNum === 0 ? styles.disabledButton : styles.noButton}><Button color='#000' title="<" onPress={() => speechNumCount(speechNum === 0 ? 0 : speechNum-1)}></Button></View>
            <View style={styles.yesButton}><Button color='#000' title=">" onPress={() => speechNumCount(speechNum+1)}></Button></View>
          </Animated.View> 
        }
        
      </View> 

      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D3C2FD',
  },
  textSpeech: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 2,
    height: 70,
    width: 250,
    marginBottom: 100
  },
  image: {
    minWidth: 180,
    minHeight: 180,
    marginBottom: 30
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 5,
    zIndex: 100,
  },
  yesButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#B2EFF3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40
  },
  noButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#FFBAC7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabledButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
