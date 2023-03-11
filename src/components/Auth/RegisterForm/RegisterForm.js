import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Icon, Button, Text } from "react-native-elements";
import { styles } from './RegisterForm.styles';

import { useFormik } from 'formik'; //manejo de formularios
import { initialValues, validationSchema } from './RegisterForm.data';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils'
import  Toast from 'react-native-toast-message';

export function RegisterForm() {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const toggleEyePassword = () => setShowPassword((prevState) => !prevState);
  const toggleEyePasswordRepeat = () => setShowPasswordRepeat((prevState) => !prevState);

  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange:false, // la validacion de los campos se realiza cuando se envia
                            //el formulario
    onSubmit: async (formValue)=>{
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password 
        );
        navigation.navigate(screen.account.account);
      } catch (error) {
        Toast.show({
          type:"error",
          position:"bottom",
          text1:"Error al registrarse, intentelo mas tarde"
        });
  
      }
    }

  });
  
  return (
    <View style={styles.content}>
      <Input 
        placeholder="Correo electronico" 
        containerStyle={styles.input}
        rightIcon={<Icon 
          type="material-community" 
          name="at" 
          iconStyle={styles.icon}
          />}
        onChangeText={text => {formik.setFieldValue("email",text)}}
        errorMessage={formik.errors.email}
      />
      <Input 
        placeholder="Contraseña" 
        secureTextEntry={!showPassword ? true : false}
        containerStyle={styles.input}
        rightIcon={<Icon 
          type="material-community" 
          name={!showPassword ? "eye-outline" : "eye-off-outline"} 
          iconStyle={styles.icon}
          onPress={toggleEyePassword}
          />}
        onChangeText={text => {formik.setFieldValue("password",text)}}
        errorMessage={formik.errors.password}
      />
      <Input 
        placeholder="Confirmar contraseña"
        secureTextEntry={!showPasswordRepeat ? true : false} 
        containerStyle={styles.input}
        rightIcon={<Icon 
          type="material-community" 
          name={!showPasswordRepeat ? "eye-outline" : "eye-off-outline"} 
          iconStyle={styles.icon}
          onPress={toggleEyePasswordRepeat}
          />}
        onChangeText={text => {formik.setFieldValue("repeatPassword",text)}}
        errorMessage={formik.errors.repeatPassword}
      />
      <View style={styles.buttonView}>
        <Button 
          title="Registrarse" 
          buttonStyle={styles.button}
          onPress={formik.handleSubmit}  
          loading={formik.isSubmitting}
        />
      </View>  
    </View>
    
  )
}