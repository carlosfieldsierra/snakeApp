import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Color from "./Colors/Color"
import  AppLoading  from "expo-app-loading";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import * as Font from 'expo-font';
// Screens
import PackScreen from "./Screens/PackScreen"
import CamScreen from "./Screens/CamScreen"
import Settings from "./Screens/Settings"
import LangScreen from "./Screens/LangScreen"

// Data Layer 
import { DataLayerContext } from "./provider/DataLayer";
import { DataLayerProvider } from "./provider/DataLayer";

// Main Stack
const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Color.red,
  },
};



// Sets the Fonts To be Used
const fetchFonts = () => {
  return Font.loadAsync({
   Nunito:require('./assets/Fonts/NunitoSans-Regular.ttf'),
   NunitoBold:require('./assets/Fonts/NunitoSans-Regular.ttf'),
   NunitoExtraBold:require('./assets/Fonts/NunitoSans-ExtraBold.ttf'),
   Anton:require("./assets/Fonts/Anton-Regular.ttf")
  });
};


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Whats for Fonts to load
  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={() => {}}
      />)}
  return (
    <DataLayerProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="packscreen" headerMode="none"  >
          <Stack.Screen name="packscreen" component={PackScreen}  />
          <Stack.Screen name='settings' component={Settings}/>
          <Stack.Screen name="langscreen" component={LangScreen}/>
          <Stack.Screen name="camscreen" component={CamScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataLayerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.red
  },
});
