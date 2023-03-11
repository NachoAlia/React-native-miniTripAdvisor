import React,{useState} from 'react';
import { View } from 'react-native';
import { Input, Button, Text} from 'react-native-elements';
import { styles } from './ChangePasswordForm.styles';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ChangePasswordForm.data';
import { getAuth, EmailAuthProvider, updatePassword, reauthenticateWithCredential } from 'firebase/auth';
import  Toast from 'react-native-toast-message';

export function ChangePasswordForm(props) {
    const {onClose, onReload} = props;
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const formik = useFormik({
        initialValues:initialValues,
        validationSchema:validationSchema,
        validateOnChange:false,
        onSubmit: async (formValues) => {
            try {
                currentUser = getAuth().currentUser;
                const credentials = EmailAuthProvider.credential(
                    currentUser.email, 
                    formValues.password
                );
                reauthenticateWithCredential(currentUser, credentials);//reautenticacion
                await updatePassword(currentUser, formValues.new_password);
                onReload();
                onClose();
                
            } catch (error) {
                Toast.show({
                    type:"error",
                    position:"bottom",
                    text1:String(error.code)
                })
            }
        }
    });


    return (
        <View style={styles.content}>
            <Input
                placeholder='Contraseña actual'
                containerStyle={styles.input}
                secureTextEntry={!showPassword1}
                rightIcon={{
                    type:"material-community",
                    name:!showPassword1 ? "eye-outline":"eye-off-outline",
                    color:"#c2c2c2",
                    onPress:()=>setShowPassword1((prevState)=>!prevState)
                }}
                onChangeText = { text => {formik.setFieldValue("password", text)} }
                errorMessage = {formik.errors.password}
                
            />
            <Input
                placeholder='Nueva contraseña'
                containerStyle={styles.input}
                secureTextEntry={!showPassword2}
                rightIcon={{
                    type:"material-community",
                    name:!showPassword2 ? "eye-outline":"eye-off-outline",
                    color:"#c2c2c2",
                    onPress:()=>setShowPassword2((prevState)=>!prevState)
                }}
                onChangeText={ text => {formik.setFieldValue("new_password",text)}}
                errorMessage={formik.errors.new_password}
            />
            <Input
                placeholder='Confirmar contraseña'
                containerStyle={styles.input}
                secureTextEntry={!showPassword3}
                rightIcon={{
                    type:"material-community",
                    name:!showPassword3 ? "eye-outline":"eye-off-outline",
                    color:"#c2c2c2",
                    onPress:()=>setShowPassword3((prevState)=>!prevState)
                }}
                onChangeText={ text => {formik.setFieldValue("confirmation_password",text) }}
                errorMessage={formik.errors.confirmation_password}

            />
        
            <Button
                title="Aceptar"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
    )
}