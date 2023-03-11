import React,{useState} from 'react';
import { View } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { styles } from './ChangeEmailForm.styles';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ChangeEmailForm.data';

import Toast  from 'react-native-toast-message';
import { 
    getAuth, 
    updateEmail, 
    EmailAuthProvider, 
    reauthenticateWithCredential 
} from 'firebase/auth';

export function ChangeEmailForm(props) {
    
    const {onClose, onReload} = props;
    const [showPassword, setShowPassword] = useState(false);
    
    const toggleShowPassword = () => setShowPassword((prevState)=> !prevState);
    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:validationSchema,
        validateOnChange:false,
        onSubmit: async(formValues)=>{
            try {
                currentUser = getAuth().currentUser;
                const credentials = EmailAuthProvider.credential(
                    currentUser.email, 
                    formValues.password
                );
                reauthenticateWithCredential(currentUser, credentials);//reautenticacion
                await updateEmail(currentUser, formValues.email);
                onReload();
                onClose();
            } catch (error) {
                Toast.show({
                    type:"error",
                    position:"bottom",
                    text1:"Ocurrio un error al cambiar el email"
                });   
            }
        }
    });
    return (
        <View styles={styles.content}>
            <Input 
                placeholder='Nuevo email'
                rightIcon={{
                    name:"at",
                    type:"material-community",
                    color:"#c2c2c2"
                }}
                containerStyle={styles.input}
                onChangeText={text => {formik.setFieldValue("email", text)}}
                errorMessage={formik.errors.email}
            />
            <Input 
                placeholder='Contraseña'
                secureTextEntry={!showPassword}
                rightIcon={{
                    name: !showPassword ? "eye-outline" : "eye-off-outline",
                    type:"material-community",
                    color:"#c2c2c2",
                    onPress:toggleShowPassword
                }}
                containerStyle={styles.input}
                onChangeText={text => {formik.setFieldValue("password", text)}}
                errorMessage={formik.errors.password}
                
            />
            <Button
                title='Aceptar'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
  )
}
