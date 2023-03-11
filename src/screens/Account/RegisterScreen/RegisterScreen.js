import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./RegisterScreen.styles";
import { Image, Text, Button } from "react-native-elements";
import { RegisterForm } from "../../../components/Auth";

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
        <Image 
            source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
            style={styles.image}    
        />
        <View style={styles.content}>
            <Text>RegisterScreen</Text>
            <RegisterForm/>
        </View>
    </KeyboardAwareScrollView>
  )
}