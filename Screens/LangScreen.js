import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Color from "../Colors/Color"
// Components
import LangSettingsLang from "../Components/LangScreen/LangSettingsLang";


const LangSettings = (props) => {
  const languages = [
    ["English", "en"],
    ["Espanol","es"]
  ];
  return (
    <View style={styles.main}>
      <View style={styles.backBtnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.goBack()}
        >
           <AntDesign name="back" size={30} color={Color.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.langContainer}>
        <ScrollView style={{ flex: 1, marginVertical: "2%" }}>
          {languages.map((lang) => (
            <LangSettingsLang key={lang} lang={lang[0]} code={lang[1]} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flex: 1,  },
  backBtnContainer: {
    flex: 1,

    justifyContent: "flex-end",
  },
  btn: { marginLeft: "12%", marginBottom: "3%" },
  langContainer: { flex: 5 },
});

export default LangSettings;