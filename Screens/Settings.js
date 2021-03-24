import React from 'react'
import { AntDesign,Fontisto,MaterialCommunityIcons,MaterialIcons,Entypo } from '@expo/vector-icons'; 
import { View, Text, StyleSheet, ScrollView,TouchableOpacity,Image,Dimensions,Linking } from "react-native";
// Reviews
import Color from "../Colors/Color"
import Flamingo from "../assets/Flamingo"
import { StatusBar } from 'expo-status-bar';
// Alerts
import ShareAlert from "../Components/Settings/ShareAlert"
import ConnectAlert from "../Components/Settings/ConnectAlert"

const {width,height} = Dimensions.get('window')

const styles = StyleSheet.create({
    main: {
      flexDirection: "row",
      padding: 35,
     
      borderBottomColor: Color.white,
      borderBottomWidth: 1,
      marginHorizontal: 15,
    },
    contain: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    arrow: {
      justifyContent: "center",
    },
    title: {
        paddingLeft: 20,
        fontSize: 15,
        color: "white",
        fontFamily: "Nunito",
      },
  });

const SettingsCompent = (props) => {
  return (
    <TouchableOpacity style={styles.main} onPress={props.onPress}>
      <View style={styles.contain}>{props.children}</View>
      <View style={styles.arrow}>
        <AntDesign name="right" size={24} color={Color.white} />
      </View>
    </TouchableOpacity>
  );
};



const Settings = (props) => {
    const ICON_SIZE = 35
    return (
        <View style={{flex:1}}>
            <StatusBar hidden/> 
            {/* Back Arrow */}
           <TouchableOpacity  onPress={()=>{
               props.navigation.goBack()
           }} style={{zIndex:1,marginTop:20,marginLeft:20}}>
                <AntDesign name="back" size={ICON_SIZE} color={Color.white} />
            </TouchableOpacity>
            {/* Title */}
            <View style={{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
                <Text style={{fontSize:width/8,color:"white"}}> SETTINGS</Text>
            </View>
            
            {/* Settings */}
            <View style={{flex:5}}>
                <ScrollView> 
                     {/* Languages */}
                     <SettingsCompent onPress={()=>{props.navigation.navigate('langscreen')}}>
                        <Fontisto name="world-o" size={ICON_SIZE} color={Color.white} />
                        <Text style={styles.title}>
                            Language
                        </Text>
                    </SettingsCompent>
                    {/* Contact Us */}
                    <SettingsCompent onPress={()=>{Linking.openURL("https://www.tipsyflamingos.com/")}}>
                        <MaterialCommunityIcons name="comment-question-outline" size={ICON_SIZE} color={Color.white} />
                        <Text style={styles.title}>
                            Contact Us
                        </Text>
                    </SettingsCompent>
                   
                  
                </ScrollView>
            </View>
        
            
        </View>
    )
}

export default Settings
