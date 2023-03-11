import React from 'react';
import {  ScrollView } from 'react-native';
import { Text, Button, Image } from "react-native-elements";
import { screen } from "../../../utils";
import { styles } from "./UserGuestScreen.styles"
import { useNavigation } from '@react-navigation/native';

export function UserGuestScreen() {
  
  const navigation = useNavigation();
 
  const goToLogin = ()=> {
    navigation.navigate(screen.account.login);
  }
 
  return (
    <ScrollView centerContent="true" style={styles.content}>
      <Image 
        source={require("../../../../assets/img/user-guest.jpg")}
        style={styles.image}
      />
      <Text style={styles.title}>Consultar tu perfil</Text>
      <Text style={styles.description}>
        Busca y visualiza los mejores restaurantes de una forma sencilla, vota cual 
        te ha gustado mas y comenta como ha sido tu experiencia
      </Text>
      
      <Button title="Ver tu perfil" buttonStyle={styles.buttonVerPerfil} onPress={goToLogin}/>
    
    </ScrollView>
  )
}