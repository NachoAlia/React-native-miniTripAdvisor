import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { styles } from './LoginForm.styles';
import { useFormik } from 'formik';
import { initialValues, validationSchema} from '../LoginForm/LoginForm.data';
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils'
import  Toast from 'react-native-toast-message';

export function LoginForm() {
  
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prevState) => !prevState);
  
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange:false, 
    onSubmit: async (formValue)=>{
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
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
        placeholder='Correo electronico' 
        style={styles.input}
        rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon}/>} 
        onChangeText={text => {formik.setFieldValue("email",text)}}
        errorMessage={formik.errors.email}
      />
        
      <Input 
        placeholder='Contraseña' 
        secureTextEntry={!showPassword ? true : false}
        style={styles.input}
        rightIcon={
          <Icon 
            type='material-community' 
            name={!showPassword ? 'eye-outline':'eye-off-outline'} 
            iconStyle={styles.icon}
            onPress={toggleShowPassword}
          />
        }
        onChangeText={text => {formik.setFieldValue("password",text)}}
        errorMessage={formik.errors.password}
      /> 
       
      <Button 
        title="Iniciar Sesion" 
        buttonStyle={styles.btnLogin}
        containerStyle={styles.btnLoginContainer}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />  
      
    </View>
  )
}