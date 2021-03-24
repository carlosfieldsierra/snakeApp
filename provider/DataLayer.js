import React, { useState, useEffect } from "react";
const DataLayerContext = React.createContext();
import Color from "../Colors/Color"
// Packs 
import {WildingoutPack} from "./Packs/WildingoutPack"
import {GettingstartedPack} from "./Packs/GettingstartedPack"
import {Round2babyPack} from "./Packs/Round2babyPack"
import {GirlsnighoutPack} from "./Packs/GirlsnighoutPack"
// Dimensions
import { DIMENSIONS } from "./Dimensions";


const DataLayerProvider = (props) => {
    // ---------Values----------
    // Color for the loading screen and first Card 
    const COLOR_LST = [Color.red,Color.white];
    const GetColor = ()=>{
        return COLOR_LST[Math.floor(Math.random() * COLOR_LST.length)]
    }
    const [firstColor,setFirstColor] = useState(GetColor())
    // Key for Language Selection
    const [Langkey, setLangKey] = useState("en");
    // Data Dictionary holds all data together
    const [DataDic, setDataDic] = useState({
      // Packs
      wildingoutPack: WildingoutPack['en'],
      gettingstartedPack: GettingstartedPack['en'],
      round2babyPack: Round2babyPack['en'],
      GirlsnighoutPack:GirlsnighoutPack['en'],
    })
    // Selected Pack
    const [selectedPack, setSelectPack] = useState('couplepack');
    // Paid for 
    const [paidFor,setPaidFor] = useState(false);
    // Dimensions set
    const [dimkey, setDimkey] = useState("alt");
    // Dimensions dictionary
    const [dimensions,setDimensions] = useState(DIMENSIONS["alt"])
    
  
  

    // -------------Values--------------

    // -------------UseEffect/Updates-----------
    useEffect(() => {
      setDataDic({
      // Packs
      wildingoutPack: WildingoutPack[Langkey],
      gettingstartedPack: GettingstartedPack[Langkey],
      round2babyPack: Round2babyPack[Langkey],
      GirlsnighoutPack:GirlsnighoutPack[Langkey],
    })
     
    }, [Langkey])

    // -------------UseEffect/Updates-----------
    useEffect(()=>{
      setDimensions(DIMENSIONS[dimkey])
      
    
    },[dimkey])
    
    
    return (
      <DataLayerContext.Provider
        value={{
            firstColor, 
            DataDic,
            selectedPack,
            setSelectPack,
            paidFor,
            setPaidFor,
            dimkey,
            setDimkey,
            dimensions

        }}
      >
        {props.children}
      </DataLayerContext.Provider>
    );
  };

  export { DataLayerProvider, DataLayerContext }