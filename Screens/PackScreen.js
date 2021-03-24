import Color from "../Colors/Color"
import { Entypo,MaterialIcons, FontAwesome5} from '@expo/vector-icons'; 
import * as React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Linking
} from 'react-native';
const { width, height } = Dimensions.get('window');
import MaskedView from "@react-native-community/masked-view";
import Svg,{Rect} from "react-native-svg";
import {LinearGradient} from "expo-linear-gradient";
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
import {Data} from "../Data/PackInfo"
import { call, useCode } from "react-native-reanimated";

// Data Layer
import { DataLayerContext } from "../provider/DataLayer";

import { Video } from "expo-av";

// SIZES 
const SPACING = 10;
const ITEM_SIZE = (width*.72);
const SPACER_ITEM_SIZE = ((width-ITEM_SIZE)/2)
const BACKDROP_HEIGHT = (height*.6)



const BackDrop = ({data,scrollX})=>{
  // DimKey Ste
  const [dimSet,setDimSet] = React.useState(false);
  // Set Dimensions
  React.useEffect(() => {
    const width_str = width.toString();
    const height_str = height.toString();
    const dimensions = width_str + "-" + height_str;
    DATA_LAYER.setDimkey(dimensions);
    setDimSet(true);
  }, []);
  // Data Layer
  const DATA_LAYER = React.useContext(DataLayerContext)
  const style = DATA_LAYER.dimensions.PackScreen;

  const SPACING = style["SPACING"];
  const ITEM_SIZE = style["cardSize"];
  const SPACER_ITEM_SIZE = ((width-ITEM_SIZE)/2)
  const BACKDROP_HEIGHT = (height*.6)


  if (!dimSet){
    return <View style={{flex:1,backgroundColor:"black"}}></View>
  }
  return(
    <View style={{position:'absolute',width,height:BACKDROP_HEIGHT}}>
      <FlatList
      data={data}
      keyExtractor={item=>item.key}
      renderItem={({item,index})=>{
        if (!item.poster){
          return null;
        }

        const inputRange = [
          (index-2)*ITEM_SIZE,
          (index-1)*ITEM_SIZE
        ]
        
        const translateX = scrollX.interpolate({
          inputRange,
          outputRange:[-width,0]
        })
        return (
          <MaskedView style={{position:'absolute'}}
          maskElement={
            <AnimatedSvg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
            style={{
              transform:[{translateX}]
            }}
            >
              <Rect
              x="0"
              y="0"
              width={width}
              height={height}
              fill="red"
              />
            </AnimatedSvg>
          }
          >
            <Image source={item.poster} style={{width:width,height:BACKDROP_HEIGHT,resizeMode:'cover'}}/>
            
          </MaskedView>
        )

      }}
      
      />
      <LinearGradient
      colors={[ 'transparent',Color.red]}
      style={{
        height: BACKDROP_HEIGHT/2,
        width:width,
        position: 'absolute',
        bottom: 0,
      }}/>
    </View>
  )
}


const Index_to_Pack = (index)=>{
  if (index===0){
    return "wildingoutPack"
  } else if (index===1){
    return "gettingstartedPack"
  } else if (index===2){
    return 'round2babyPack'
  } else if (index===3){
    return "GirlsnighoutPack"
  } 
}



const PackScreen = (props) => {
  // DimKey Ste
  const [dimSet,setDimSet] = React.useState(false);
  // Set Dimensions
  React.useEffect(() => {
    const width_str = width.toString();
    const height_str = height.toString();
    const dimensions = width_str + "-" + height_str;
    DATA_LAYER.setDimkey(dimensions);
    setDimSet(true);
  }, []);
  // Data Layer
  const DATA_LAYER = React.useContext(DataLayerContext)
  const style = DATA_LAYER.dimensions.PackScreen;
  // Pack Index
  const [packIndex,setPackIndex] = React.useState(4)
  
  const SPACING = style["SPACING"];
  const ITEM_SIZE = style["cardSize"];
  const SPACER_ITEM_SIZE = ((width-ITEM_SIZE)/2)
  const BACKDROP_HEIGHT = (height*.6)

  
  // ADDED To make it start in middle
  const initialIndex = 1;
  const scrollX = React.useRef(new Animated.Value(initialIndex * ITEM_SIZE)).current;

  

  

  const Item_Size = new Animated.Value(ITEM_SIZE)
  React.useEffect(() => {
    scrollX.addListener(val => {
      // Divides Scrollx by the size of each item 
      const x = Animated.divide(scrollX,Item_Size);
      // Gives index number of each 
      const indexNum= Math.round(Number.parseFloat(JSON.stringify(x)));
      const pack = Index_to_Pack(indexNum)
      setPackIndex(indexNum);
      DATA_LAYER.setSelectPack(pack)

    });
  }, []);

  
  
 
  const StartHandler = (index)=>{
    if (index===0){
      Linking.openURL("https://www.cdc.gov/niosh/topics/snakes/default.html")
    }
    if (index===1){
      props.navigation.replace("camscreen")
    }
    if (index==2){
      props.navigation.replace("camscreen")
    }
   
    
  }
  if (!dimSet){
    return <View style={{flex:1,backgroundColor:"black"}}></View>
  }

 
  return (
    <>
      <View style={{...StyleSheet.absoluteFillObject,width:style["questionSize"],height:style["questionSize"],zIndex:1,margin:style["questionMargin"]}}>
        {/* TODO: make this go to subscreen */}
       <TouchableOpacity onPress={()=>{}}>
          <FontAwesome5 name="question" size={style["questionSize"]} color="black" />
       </TouchableOpacity>
     </View>
     <View style={{...StyleSheet.absoluteFillObject,width:style["settingSize"],height:style["settingSize"],left:style["settingLeft"],zIndex:1,marginTop:style["settingMargin"]}}>
       <TouchableOpacity onPress={()=>{
         props.navigation.navigate('settings')
       }}>
         <MaterialIcons name="settings" size={style["settingSize"]} color={Color.red}  />
       </TouchableOpacity>
     </View>

     <Video
          source={require("../assets/PackScreen/logo.mp4")}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{...StyleSheet.absoluteFillObject,width:style["logoWidth"],height:style["logoHeight"],left:style["logoLeft"],zIndex:1,marginTop:style["logoMoveUp"]}}
        ></Video>




    <View style={styles.container}>
      <StatusBar hidden />
      <BackDrop data={Data} scrollX={scrollX}/>
      <LinearGradient
      colors={[ 'transparent',Color.red]}
      style={{
        height: BACKDROP_HEIGHT,
        width:width,
        position: 'absolute',
        bottom: 1000,
      }}/>
      <Animated.FlatList
      initialScrollIndex={initialIndex}
      getItemLayout={(data, index) => ({
        index,
        offset: ITEM_SIZE * index,
        length: data.length
      })}

      showsHorizontalScrollIndicator={false}
      data={Data}
      keyExtractor={(item)=>item.key}
      horizontal
      contentContainerStyle={{
        alignItems:'center'
      }}
      snapToInterval={ITEM_SIZE}
      decelerationRate={0}
      bounces={false}
      // Keeps track of moving x
      onScroll={Animated.event(
        [{nativeEvent:{contentOffset:{x:scrollX}}}],
        {useNativeDriver:true}
      )}
      scrollEventThrottle={16}
      renderItem={({item,index})=>{
        if (!item.poster){
          return <View style={{width:SPACER_ITEM_SIZE}}/>
        }
        // I Could use these bounds right for selecting the pack
        const inputRange = [
          (index-2)*ITEM_SIZE,
          (index-1)*ITEM_SIZE,
          (index)*ITEM_SIZE,
        ];
        // Makes the slides go up when on it
        const translateY = scrollX.interpolate({
          inputRange,
          outputRange:[150,100,150]
        })

        return (
          <View style={{width:ITEM_SIZE}}>
            <Animated.View style={{
              marginHorizontal:SPACING,
              marginBottom:style["pushUp"],
              padding:SPACING*2,
              alignItems:'center',
              backgroundColor:Color.red,
              borderRadius:34,
              transform:[{translateY}]
            }}>
              <Image source={item.pack} style={{width: '100%',
        height: style["cardHieght"],
        resizeMode: 'cover',
        borderRadius: 24,
        margin: 0,
        marginBottom: 20,
      }}/>
              <Text style={{ fontSize: style["cardTitleFontSize"],color:Color.white,marginTop:style["cardTitleMoveDown"],fontFamily:'NunitoExtraBold'}} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={{textAlign:'center',fontFamily:'Nunito',color:Color.white,fontSize:style["cardDescriptionFontSize"],padding:style["cardDescriptionPadding"]}} numberOfLines={3}>
                {item.description}
              </Text>
            </Animated.View>
          </View>)}}
        />
        <View style={{flex:style["buttonFlex"],justifyContent:'center',alignItems:'center',marginBottom:style["buttonPushUp"],}}>
          <TouchableOpacity style={{height:style["OutsideHeight"]}} onPress={()=>{StartHandler(packIndex)}}>
            <View style={{width:style["OutsideWidth"],borderRadius:style["OutsideBorderRadius"],backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}}>
              <View style={{flex:1,backgroundColor:Color.red,width:style["InsideWidth"],borderRadius:style["InsideBorderRadius"],marginVertical:style["marginVertical"],justifyContent:'center',alignItems:'center'}}>
              {(packIndex===0) && <Text style={{fontSize:style["cdcFontSize"],fontFamily:'NunitoExtraBold',color:Color.white,textAlign:"center"}}>SNAKE SAFTEY INFO LINK</Text>}
                {(packIndex===1) && <Text style={{fontSize:style["nightFontSize"],fontFamily:'NunitoExtraBold',color:Color.white,textAlign:"center"}}>NIGHT SCAN FOR SNAKES</Text>}
                {(packIndex===2) && <Text style={{fontSize:style["dayFontSize"],fontFamily:'NunitoExtraBold',color:Color.white,textAlign:"center"}}>DAY SCAN FOR SNAKES</Text>}

                
              </View>
            </View>
          </TouchableOpacity>
        </View>
    </View>
    
    </>
  )}
  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily:"Nunito"
    },
    posterImage: {
      width: '100%',
      height: ITEM_SIZE * 1.2,
      resizeMode: 'cover',
      borderRadius: 24,
      margin: 0,
      marginBottom: 10,
    },
  })



export default PackScreen





























