import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './LoginScreen.styles';
import { Button, Text, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils';
import { LoginForm } from '../../../components/Auth';

export function LoginScreen() {
  const navigation = useNavigation();
  const goToRegister = () => {
    navigation.navigate(screen.account.register);
  }
  return (
    <ScrollView>
      <Image 
        source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")}
        style={styles.image}
      />
      <View style = {styles.content}>
      <LoginForm/>  
      <Text style={styles.textRegister}>
        ¿Aun no tienes una cuenta? <Text style={styles.btnRegister} onPress={goToRegister}>Registrate</Text>
      </Text>
      </View>
    </ScrollView>
  )
}